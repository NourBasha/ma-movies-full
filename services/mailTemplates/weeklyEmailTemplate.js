
const keys = require('../../config/keys');

const _ =  require('lodash');


module.exports = (user, subscribtion, movies) =>{

  console.log('template, movies is :', movies);

    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  data-editor-version="2"
  class="sg-campaigns"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
   
    <style type="text/css">
      body,
      p,
      div {
        font-family: arial, helvetica, sans-serif;
        font-size: 16px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #136e6ed0;
        text-decoration: none;
      }
      p {
        margin: 0;
        padding: 0;
      }
      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width: 480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
    <!--user entered Head Start-->
    <!--End Head user entered-->
  </head>
  <body>
    <center
      class="wrapper"
      data-link-color="#136e6ed0"
      data-body-style="font-size:16px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#1f4949;"
    >
      <div class="webkit">
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="100%"
          class="wrapper"
          bgcolor="#1f4949"
        >
          <tr>
            <td valign="top" bgcolor="#1f4949" width="100%">
              <table
                width="100%"
                role="content-container"
                class="outer"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td width="100%">
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td>
                          <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="width: 100%; max-width: 600px"
                            align="center"
                          >
                            <tr>
                              <td
                                role="modules-container"
                                style="
                                  padding: 0px 0px 0px 0px;
                                  color: #000000;
                                  text-align: left;
                                "
                                bgcolor="#126464"
                                width="100%"
                                align="left"
                              >
                                <table
                                  class="module preheader preheader-hide"
                                  role="module"
                                  data-type="preheader"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="
                                    display: none !important;
                                    mso-hide: all;
                                    visibility: hidden;
                                    opacity: 0;
                                    color: transparent;
                                    height: 0;
                                    width: 0;
                                  "
                                >
                                  <tr>
                                    <td role="module-content">
                                      <p></p>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  class="wrapper"
                                  role="module"
                                  data-type="image"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="a73ad113-f07b-4d8e-89eb-5aa0fc11ac16"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          font-size: 6px;
                                          line-height: 10px;
                                          padding: 0px 0px 0px 0px;
                                        "
                                        valign="top"
                                        align="center"
                                      >
                                        <img
                                          class="max-width"
                                          border="0"
                                          style="
                                            display: block;
                                            color: #000000;
                                            text-decoration: none;
                                            font-family: Helvetica, arial,
                                              sans-serif;
                                            font-size: 16px;
                                            max-width: 30% !important;
                                            width: 30%;
                                            height: auto !important;
                                          "
                                          width="180"
                                          alt=""
                                          data-proportionally-constrained="true"
                                          data-responsive="true"
                                          src="http://cdn.mcauto-images-production.sendgrid.net/6dbdf72d0ce32d11/a9a83eaa-8f00-42ea-bdcc-96062acc79bf/200x200.png"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="spacer"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="230a9b95-fe08-40ce-8b72-7edcb7f3e0cb"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 0px 0px 30px 0px"
                                        role="module-content"
                                        bgcolor="#029e9eab"
                                      ></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="05cf8419-874d-488e-9d29-dc9366df3056"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 20px 0px 20px 0px;
                                          line-height: 30px;
                                          text-align: inherit;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: center;
                                              font-size: 16px;
                                            "
                                          >
                                            <span
                                              style="
                                                color: #ffffff;
                                                font-family: georgia, serif;
                                              "
                                              ><strong
                                                >Hello ${user?user.displayName+',':'There!'} as we promised, these
                                                are the top movies this
                                                week.</strong
                                              ></span
                                            >
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: center;
                                            "
                                          >
                                            <span
                                              style="
                                                color: #ffffff;
                                                font-family: georgia, serif;
                                              "
                                              ><strong
                                                >happy watching!</strong
                                              ></span
                                            >
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="spacer"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed ; margin-bottom:10px;"
                                  data-muid="e1f5c3a8-860d-495c-96b2-c9649de239cf"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 0px 0px 30px 0px"
                                        role="module-content"
                                        bgcolor="#029e9eab"
                                      ></td>
                                    </tr>
                                  </tbody>
                                </table>
                               ${

                                _.map(movies, (movie)=>{
                                  return(
                                    
                                    `
                                    <table
                                    class="module"
                                    role="module"
                                    data-type="text"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="table-layout: fixed"
                                    data-muid="de755ec5-f91e-4bc3-916c-d017602d7d4b"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            padding: 18px 0px 0px 0px;
                                            line-height: 22px;
                                            text-align: inherit;
                                          "
                                          height="100%"
                                          valign="top"
                                          bgcolor=""
                                          role="module-content"
                                        >
                                          <div>
                                            <div
                                              style="
                                                font-family: inherit;
                                                text-align: center;
                                                font-weight: bold ;
                                                font-size: 22px;
                                                margin-bottom:5px;
                                              "
                                                >
                                              <span style="color: #ffffff"
                                                >
                                                
                                                ${movie.title}
                                                
                                                </span
                                              >
                                            </div>
                                            <div
                                              style="
                                                font-family: inherit;
                                                text-align: center;
                                                font-weight: bold ;
                                                font-size: 19px ;
                                                marigin-top: 5px;
                                                margin-bottom:5px;
                                              "
                                                >
                                              <span style="color: #fcff33"
                                                >
                                                
                                                ${movie.vote_average}
                                                <span style="font-size:12px; color:#ffffff;"> /10</span>
                                                
                                                </span
                                              >
                                            </div>
                                            <div></div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    class="wrapper"
                                    role="module"
                                    data-type="image"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="table-layout: fixed"
                                    data-muid="cb62f8c4-8107-486c-84fb-8d5d848edf7f.4"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            font-size: 6px;
                                            line-height: 10px;
                                            padding: 0px 0px 0px 0px;
                                          "
                                          valign="top"
                                          align="center"
                                        >
                                         <a href='${keys.redirectDomain}/movie/${movie.id}'> 
                                         <img
                                         class="max-width"
                                         border="0"
                                         style="
                                           display: block;
                                           color: #000000;
                                           text-decoration: none;
                                           font-family: Helvetica, arial,
                                             sans-serif;
                                           font-size: 16px;
                                           max-width: 70% !important;
                                           width: 70%;
                                           height: auto !important;
                                         "
                                         width="270"
                                         alt="poster"
                                         data-proportionally-constrained="true"
                                         data-responsive="true"
                                         src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                                       />
                                         </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                    `
                                  )
                                })

                               }
                                <table
                                  class="module"
                                  role="module"
                                  data-type="spacer"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed ; margin: 20px 0 0 0;"
                                  data-muid="0549999f-8bc5-4180-8c5a-0463afcd7bcd"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 0px 0px 30px 0px; "
                                        role="module-content"
                                        bgcolor="#029E9EAB"
                                      ></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="16b71028-9622-49b9-a9ec-4f8e5e304ab1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 18px 0px 3px 0px;
                                          line-height: 22px;
                                          text-align: inherit;
                                          background-color: #126464;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor="#126464"
                                        role="module-content"
                                      >
                                        <div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: center;
                                            "
                                          >
                                            <span
                                              style="
                                                box-sizing: border-box;
                                                padding-top: 0px;
                                                padding-right: 0px;
                                                padding-bottom: 0px;
                                                padding-left: 0px;
                                                margin-top: 0px;
                                                margin-right: 0px;
                                                margin-bottom: 0px;
                                                margin-left: 0px;
                                                font-style: inherit;
                                                font-variant-ligatures: inherit;
                                                font-variant-caps: inherit;
                                                font-variant-numeric: inherit;
                                                font-variant-east-asian: inherit;
                                                font-weight: inherit;
                                                font-stretch: inherit;
                                                line-height: inherit;
                                                font-family: inherit;
                                                vertical-align: baseline;
                                                border-top-width: 0px;
                                                border-right-width: 0px;
                                                border-bottom-width: 0px;
                                                border-left-width: 0px;
                                                border-top-style: initial;
                                                border-right-style: initial;
                                                border-bottom-style: initial;
                                                border-left-style: initial;
                                                border-top-color: initial;
                                                border-right-color: initial;
                                                border-bottom-color: initial;
                                                border-left-color: initial;
                                                border-image-source: initial;
                                                border-image-slice: initial;
                                                border-image-width: initial;
                                                border-image-outset: initial;
                                                border-image-repeat: initial;
                                                letter-spacing: normal;
                                                orphans: 2;
                                                text-align: center;
                                                text-indent: 0px;
                                                text-transform: none;
                                                widows: 2;
                                                word-spacing: 0px;
                                                -webkit-text-stroke-width: 0px;
                                                background-color: rgba(
                                                  19,
                                                  110,
                                                  110,
                                                  0.816
                                                );
                                                text-decoration-thickness: initial;
                                                text-decoration-style: initial;
                                                text-decoration-color: initial;
                                                white-space: normal;
                                                float: none;
                                                display: inline;
                                                color: #ffffff;
                                                font-size: 12px;
                                              "
                                              >©2021 MaMovies | Alexandria,
                                              Egypt</span
                                            ><span style="font-size: 12px">
                                              &nbsp;</span
                                            >
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="social"
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="9b58a36a-1b5d-44d8-8f3d-f410634553f4"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        valign="top"
                                        style="
                                          padding: 5px 0px 0px 0px;
                                          font-size: 6px;
                                          line-height: 10px;
                                        "
                                        align="center"
                                      >
                                        <table
                                          align="center"
                                          style="
                                            -webkit-margin-start: auto;
                                            -webkit-margin-end: auto;
                                          "
                                        >
                                          <tbody>
                                            <tr align="center">
                                              <td
                                                style="padding: 0px 5px"
                                                class="social-icon-column"
                                              >
                                                <a
                                                  role="social-icon-link"
                                                  href="https://www.facebook.com/nour.wagdy.334839/"
                                                  target="_blank"
                                                  alt="Facebook"
                                                  title="Facebook"
                                                  style="
                                                    display: inline-block;
                                                    background-color: #3b579d;
                                                    height: 17px;
                                                    width: 17px;
                                                    border-radius: 3px;
                                                    -webkit-border-radius: 3px;
                                                    -moz-border-radius: 3px;
                                                  "
                                                >
                                                  <img
                                                    role="social-icon"
                                                    alt="Facebook"
                                                    title="Facebook"
                                                    src="https://mc.sendgrid.com/assets/social/white/facebook.png"
                                                    style="
                                                      height: 17px;
                                                      width: 17px;
                                                    "
                                                    height="17"
                                                    width="17"
                                                  />
                                                </a>
                                              </td>
                                              <td
                                                style="padding: 0px 5px"
                                                class="social-icon-column"
                                              >
                                                <a
                                                  role="social-icon-link"
                                                  href="http://www.linkedin.com/in/nour-wagdy-932918184"
                                                  target="_blank"
                                                  alt="LinkedIn"
                                                  title="LinkedIn"
                                                  style="
                                                    display: inline-block;
                                                    background-color: #0077b5;
                                                    height: 17px;
                                                    width: 17px;
                                                    border-radius: 3px;
                                                    -webkit-border-radius: 3px;
                                                    -moz-border-radius: 3px;
                                                  "
                                                >
                                                  <img
                                                    role="social-icon"
                                                    alt="LinkedIn"
                                                    title="LinkedIn"
                                                    src="https://mc.sendgrid.com/assets/social/white/linkedin.png"
                                                    style="
                                                      height: 17px;
                                                      width: 17px;
                                                    "
                                                    height="17"
                                                    width="17"
                                                  />
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  data-role="module-unsubscribe"
                                  class="module"
                                  role="module"
                                  data-type="unsubscribe"
                                  style="
                                    background-color: #126464;
                                    font-size: 12px;
                                    line-height: 20px;
                                    padding: 8px 16px 8px 16px;
                                    text-align: Center;
                                  "
                                  data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                >
                                  <div class="Unsubscribe--addressLine"></div>
                                  <p style="font-size: 12px; line-height: 20px">
                                    <a
                                      target="_blank"
                                      class="Unsubscribe--unsubscribeLink zzzzzzz"
                                      href='${keys.redirectDomain}/api/unsubscribe/${subscribtion._id}'
                                      style="color: #00dbdb"
                                      >Unsubscribe</a
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>


    
    `


}