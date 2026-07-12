function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isEmptyBody(html) {
  if (!html || html.trim() === '') return true
  const stripped = html.replace(/<[^>]*>/g, '').trim()
  return stripped === ''
}

function buttonBlock(text, href) {
  return `
              <table style="margin:16px auto 8px;border-collapse:separate;" border="0" cellspacing="0" cellpadding="0" align="center">
                <tbody>
                  <tr>
                    <td style="font-size:14px;font-family:Arial;color:#ffffff;font-weight:normal;padding:10px 20px;vertical-align:middle;background-color:#b71234;border-radius:4px;border:0px none #000;" align="center" valign="middle" bgcolor="#b71234">
                      <a href="${escapeHtml(href)}" target="_blank" rel="noopener" style="text-decoration:none;color:#ffffff;font-weight:bold;font-size:14px;">${escapeHtml(text)}</a>
                    </td>
                  </tr>
                </tbody>
              </table>`
}

function sectionBlock(section) {
  const { title, imageUrl, imageAlt, body, hasButton, buttonText, buttonHref } = section
  const parts = []

  if (title.trim()) {
    parts.push(`              <h1>${escapeHtml(title.trim())}</h1>`)
  }

  if (imageUrl.trim()) {
    parts.push(`              <div align="center" style="margin:10px 0;">
                <img src="${escapeHtml(imageUrl.trim())}" alt="${escapeHtml(imageAlt || '')}" width="550" style="max-width:100%;display:block;border:0;margin:0 auto;">
              </div>`)
  }

  if (!isEmptyBody(body)) {
    parts.push(`              <div align="justify" style="color:#000;text-align:justify;font-family:Arial;font-size:14px;line-height:1.6;">
                ${body}
              </div>`)
  }

  if (hasButton && buttonText.trim() && buttonHref.trim()) {
    parts.push(buttonBlock(buttonText.trim(), buttonHref.trim()))
  }

  if (parts.length === 0) return ''

  return `
      <!-- ===== SECCIÓN: ${escapeHtml(title || '(sin título)')} ===== -->
      <tr>
        <td>
          <hr style="height:3px;border-width:0;color:gray;background-color:gray;">
          <table style="background-color:#ffffff;padding-left:20px;padding-right:20px;" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td style="text-align:center;color:#b71234;">
${parts.join('\n')}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>`
}

export function generateHTML(sections) {
  const sectionBlocks = sections
    .map(sectionBlock)
    .filter(Boolean)
    .join('\n')

  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>SECTIP - Mailing UTN FRBA</title>
</head>

<body>

  <table style="max-width:590px!important;width:590px;" border="0" width="590" cellspacing="0" cellpadding="0" align="center">
    <tbody>

      <!-- ========== ENCABEZADO / LOGO UTN ========== -->
      <tr>
        <td>
          <div align="center">
            <img src="https://lh3.googleusercontent.com/pw/AM-JKLXUVWWmHamD2hlQWBVrcdCnr1usswU6tXIc4Oq15gC3UvyA1voW7iq6rAUQDewOznlDGHgPqjf6TB_xlnjsz5FYjFbOnq7TgMOudyT1ThywMkWpOMuGGvbTpqgtTxu8dYJeKqXMRim1GOO7IWkHUqM=w1398-h255-no?authuser=0"
                 alt="Encabezado UTN FRBA"
                 width="590"
                 style="display:block;border:0;">
          </div>
        </td>
      </tr>

      <!-- ========== TÍTULO DE LA SECRETARÍA ========== -->
      <tr>
        <td>
          <hr style="height:3px;border-width:0;color:gray;background-color:gray;">
          <table style="background-color:#ffffff;padding-left:20px;padding-right:20px;" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td>
                  <h1 style="color:#b71234;text-align:center;">Secretaría de Ciencia,<br>Tecnología e Innovación Productiva</h1>
                  <h2 style="color:#000000;text-align:center;">NOVEDADES</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
${sectionBlocks}

      <!-- ========== PIE DE PÁGINA: REDES SOCIALES ========== -->
      <tr>
        <td>
          <hr style="height:3px;border-width:0;color:gray;background-color:gray;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="center" style="padding:10px 0;">
                  <table border="0" cellspacing="0" cellpadding="6" align="center">
                    <tbody>
                      <tr>
                        <td>
                          <a href="https://facebook.com/prensa.frba/" target="_blank" rel="noopener">
                            <img src="https://lh3.googleusercontent.com/pw/AM-JKLXy3By1OqqTGD0f4_FFZd5PRzbeiFj4kyygXUYbYoRDF3G6383sR66quYcZFqaRs1JoAfbLyGllxsz5Dv1-Z2R_ZwtqQxLPsEBvL_5-9SLhC1WNTqf_47CTUlziWp-0KtWoSl5T8aISd4_6-6cgyt4=s36-no?authuser=0"
                                 alt="Facebook" width="36" height="36" style="display:block;border:0;">
                          </a>
                        </td>
                        <td>
                          <a href="https://twitter.com/frbautn" target="_blank" rel="noopener">
                            <img src="https://lh3.googleusercontent.com/pw/AM-JKLU6LtyNGHy0MUbGqRlqmWEQVyXRTmRWWTB-TLjRAg-FKOvJq_ULFuVNUzXKebexrKzkoDrHGl8Fby5Doq5nqkn7RmKkiTln5uf3x7p4fXHn0zt7dz-spbh2Piltc-zIL4gWleosCiw-1yAH8i88S6k=s36-no?authuser=0"
                                 alt="Twitter" width="36" height="36" style="display:block;border:0;">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

    </tbody>
  </table>

</body>
</html>`
}
