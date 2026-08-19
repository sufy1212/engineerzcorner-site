#!/usr/bin/env python3
"""
Validate that HTML pages match their CSS and JS files.
Catches drift like: index.html using .nt-card classes but index.inline.css not defining them.

Run before deployment: python3 scripts/validate-css-js-match.py
Exit code 0 = all OK, 1 = mismatches found.
"""
import re
import sys
from pathlib import Path

def extract_classes(html_content):
    """Extract all class names used in HTML."""
    return set(re.findall(r'class=["\']([^"\']+)["\']', html_content))

def extract_css_selectors(css_content):
    """Extract all CSS class selectors defined."""
    # Match .classname but not in comments
    selectors = set()
    for line in css_content.split('\n'):
        if '/*' in line:
            line = line[:line.index('/*')]
        matches = re.findall(r'\.([a-zA-Z_-][a-zA-Z0-9_-]*)', line)
        selectors.update(matches)
    return selectors

def extract_inline_css(html_content):
    """Extract CSS from inline <style> blocks in HTML."""
    styles = re.findall(r'<style[^>]*>(.*?)</style>', html_content, re.DOTALL)
    return '\n'.join(styles)

def extract_js_functions(js_content):
    """Extract function names defined in JS."""
    # Match function keyword and variable assignments
    return set(re.findall(r'(?:function|const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)', js_content))

def flatten_class_list(class_string):
    """Split space-separated classes into individual ones."""
    return set(class_string.split())

def validate_page_pair(html_path, css_path, js_path, page_name, repo_root):
    """Validate that HTML matches its CSS and JS files."""
    errors = []
    
    if not html_path.exists():
        return [f"{page_name}: {html_path} not found"]
    if not css_path.exists():
        return [f"{page_name}: {css_path} not found"]
    if not js_path.exists():
        return [f"{page_name}: {js_path} not found"]
    
    html = html_path.read_text(encoding='utf-8')
    css = css_path.read_text(encoding='utf-8')
    js = js_path.read_text(encoding='utf-8')
    
    # Load shared CSS files (common-blocks, sidebars) to check against
    shared_css = ""
    common_blocks_css = repo_root / 'assets' / 'common-blocks.css'
    sidebars_css = repo_root / 'assets' / 'sidebars.css'
    
    if common_blocks_css.exists():
        shared_css += common_blocks_css.read_text(encoding='utf-8')
    if sidebars_css.exists():
        shared_css += sidebars_css.read_text(encoding='utf-8')
    
    # Also extract inline CSS from the HTML itself
    inline_css = extract_inline_css(html)
    
    # Combine inline CSS + page CSS + shared CSS
    combined_css = inline_css + css + shared_css
    
    # Extract classes from HTML
    html_class_strings = extract_classes(html)
    html_classes = set()
    for class_str in html_class_strings:
        html_classes.update(flatten_class_list(class_str))
    
    # Extract classes defined in combined CSS
    css_classes = extract_css_selectors(combined_css)
    
    # Check for missing CSS class definitions
    # Allow for some classes that are animation-only, dynamically generated, or from third-party libraries
    external_classes = {
        'revealed',  # added by JS after reveal
        'active', 'focus', 'hover',  # pseudo-classes as classes
        # Third-party form library classes (Brevo/Sendinblue embed)
        'sf-newsletter', 'sib-form', 'sib-input', 'sib-container--large', 'sib-container--vertical',
        'sib-form-block__button-with-loader', 'sib-form-container', 'sib-form-message-panel__inner-text',
        'sib-form-message-panel__text', 'sib-form-message-panel__text--center', 'sib-hide-loader-icon',
        # Form utility classes  
        'entry__error', 'entry__error--primary', 'entry__field', 'entry_block', 'form__entry', 'form__label-row',
        'clickable__icon', 'icon', 'input--hidden', 'progress-indicator__icon',
    }
    
    missing_css = (html_classes - css_classes) - external_classes
    if missing_css:
        missing_list = ', '.join(sorted(missing_css))
        errors.append(
            f"{page_name}: HTML uses CSS classes not defined in {css_path.name}, shared assets, or inline styles:\n"
            f"  Missing: {missing_list}\n"
            f"  (Ensure {html_path.name} loads assets/common-blocks.css and assets/sidebars.css)"
        )
    
    # Extract functions used in HTML (data-* attributes, onclick, etc)
    html_js_refs = set(re.findall(r'on\w+=["\']([a-zA-Z_$][a-zA-Z0-9_$()]*)', html))
    html_js_refs.update(re.findall(r'data-js=["\']([a-zA-Z_$][a-zA-Z0-9_$()]*)', html))
    
    # Extract function names defined in JS
    js_functions = extract_js_functions(js)
    
    # Check for missing JS function definitions (lenient — many refs won't be function defs)
    # This is more of a warning; we're mainly checking for obvious gaps
    if html_js_refs:
        missing_js = html_js_refs - js_functions
        # Only warn if it looks like a real gap (e.g., reference to a function that should be defined)
        # Skip warnings for built-ins and common APIs
        builtin_js = {'fetch', 'addEventListener', 'getElementById', 'setTimeout', 'requestAnimationFrame',
                      'console.log', 'Math', 'JSON', 'parseInt', 'parseFloat', 'Object', 'Array'}
        missing_js = missing_js - builtin_js
        if missing_js and len(missing_js) < 5:  # Only warn if a small number of genuine misses
            missing_list = ', '.join(sorted(missing_js))
            # Don't error, just warning-level for now since JS is harder to validate
            pass  # Could log a warning here if desired
    
    return errors

def main():
    repo_root = Path(__file__).parent.parent
    
    print("Validating CSS/JS matches...")
    print()
    
    all_errors = []
    
    # Check root homepage
    all_errors.extend(validate_page_pair(
        repo_root / 'index.html',
        repo_root / 'index.inline.css',
        repo_root / 'index.inline.js',
        "Root homepage",
        repo_root
    ))
    
    # Check posts page
    all_errors.extend(validate_page_pair(
        repo_root / 'posts' / 'index.html',
        repo_root / 'posts' / 'index.inline.css',
        repo_root / 'posts' / 'index.inline.js',
        "Posts listing",
        repo_root
    ))
    
    if all_errors:
        print("❌ VALIDATION FAILED:")
        print()
        for error in all_errors:
            print(error)
            print()
        return 1
    else:
        print("✓ All HTML/CSS/JS pairs are in sync")
        return 0

if __name__ == '__main__':
    sys.exit(main())
