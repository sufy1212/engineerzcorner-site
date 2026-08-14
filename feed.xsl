<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title><xsl:value-of select="/rss/channel/title"/></title>
<style>
  :root{--paper:#F3F4FA;--sheet:#FFFFFF;--sheet-2:#F7F8FC;--line:#E1E3F0;--line-soft:#ECEEF7;--ink:#181B29;--ink-dim:#565A74;--ink-faint:#8D91AA;--plate:#181B2E;--plate-2:#23273D;--amber:#6C5CE7;--amber-deep:#4C3FC7;--blue:#0D9488;}
  *{box-sizing:border-box}
  html,body{margin:0;background:var(--paper);color:var(--ink);font-family:-apple-system,"Inter",Arial,sans-serif}
  .wrap{max-width:760px;margin:0 auto;padding:0 18px 60px}
  header{background:linear-gradient(135deg,var(--plate) 0%,var(--plate-2) 100%);padding:34px 18px 26px;margin-bottom:28px}
  header .inner{max-width:760px;margin:0 auto}
  .eyebrow{font-family:"JetBrains Mono","SF Mono",Consolas,monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#2DD4BF;font-weight:600;margin-bottom:8px}
  h1{font-size:26px;font-weight:800;letter-spacing:-.01em;color:#f8f8ff;margin:0 0 8px}
  .desc{font-size:13.5px;color:#b8bad9;line-height:1.6;max-width:56ch;margin:0}
  .rss-note{display:flex;align-items:center;gap:8px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.12);font-family:"JetBrains Mono",Consolas,monospace;font-size:10.5px;color:#8f92b8;letter-spacing:.02em}
  .rss-note b{color:#e5e4f5}
  .item{background:var(--sheet);border:1px solid var(--line);border-radius:12px;padding:18px 20px;margin-bottom:14px;box-shadow:0 1px 3px rgba(24,27,41,.05)}
  .item a{color:var(--ink);font-size:16px;font-weight:700;text-decoration:none;line-height:1.4}
  .item a:hover{color:var(--amber-deep);text-decoration:underline}
  .item .date{font-family:"JetBrains Mono",Consolas,monospace;font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-faint);margin:6px 0 10px}
  .item .item-desc{font-size:13.5px;color:var(--ink-dim);line-height:1.6;margin:0}
  footer{text-align:center;padding:20px 0 40px;font-family:"JetBrains Mono",Consolas,monospace;font-size:11px;color:var(--ink-faint)}
  footer a{color:var(--amber-deep);text-decoration:none}
</style>
</head>
<body>
<header>
  <div class="inner">
    <div class="eyebrow">RSS Feed</div>
    <h1><xsl:value-of select="/rss/channel/title"/></h1>
    <p class="desc"><xsl:value-of select="/rss/channel/description"/></p>
    <div class="rss-note">
      This is an RSS feed. <b>Copy this page's URL</b> into an RSS reader app (Feedly, Inoreader, NetNewsWire) to follow new posts automatically.
    </div>
  </div>
</header>
<div class="wrap">
  <xsl:for-each select="/rss/channel/item">
  <div class="item">
    <a href="{link}"><xsl:value-of select="title"/></a>
    <div class="date"><xsl:value-of select="pubDate"/></div>
    <p class="item-desc"><xsl:value-of select="description"/></p>
  </div>
  </xsl:for-each>
  <footer>
    <a href="https://www.engineerzcorner.com">← Back to EngineerzCorner</a>
  </footer>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
