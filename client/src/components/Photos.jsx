import React from "react";
import { motion } from "framer-motion";

const ImageWall = () => {
  // Example image links (tum apni 40+ links yaha dal do)
  const images = [
    "https://scontent.fknu1-2.fna.fbcdn.net/v/t39.30808-6/514288998_10088338914606197_1759433423294613710_n.jpg?stp=c0.293.713.713a_dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=50ad20&_nc_ohc=4nkjwaVgk-0Q7kNvwGBsZ6W&_nc_oc=AdmxPQElVRCzwh_JPQ3ACk3c1IBAEm5-RZtY7ZbhEnlyfn-NWotl01D2KheK6916rkksNlJaGR33ubLy0GySQuPH&_nc_zt=23&_nc_ht=scontent.fknu1-2.fna&_nc_gid=ywCAYOst7Z-UMso911C4aw&oh=00_AfbLjQD2JZruCRlxCpj6-_FHpgE9Z39IVMcciqA3As3P-g&oe=68BE1454",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/514396192_10088338837939538_8649365252968427029_n.jpg?stp=c0.293.713.713a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=50ad20&_nc_ohc=_1j0YwvVYloQ7kNvwFx7C8l&_nc_oc=AdlrRIAQJ5qu0C9D1wwVbzFF5VJM75PVpOwN-FLxToqeef_nQiSbnnBXZIqMTvRGv82tTK6Lx5owl9shIZHHF_EK&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=2-iLKuhOM8gn_hnME-qlYQ&oh=00_AfY9xlaEHGuv8D10PlzVrL-mE1jnwVV7v_sRvRJ1OAp7Dg&oe=68BDFC97",
    "https://scontent.fknu1-2.fna.fbcdn.net/v/t39.30808-6/514406984_10088338821272873_6467885228466715892_n.jpg?stp=c0.293.713.713a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=tyUv0uXHjS4Q7kNvwERJ9t5&_nc_oc=Adkh5D_Nn9vWy6WBdWkLEhQSn5E_2K48YY2um3vxdHnERZhr43U38-j1yjLZn5KRTVw-tpaTfygieeo0uuUiobqq&_nc_zt=23&_nc_ht=scontent.fknu1-2.fna&_nc_gid=2-iLKuhOM8gn_hnME-qlYQ&oh=00_AfY0jt-RP7VGKCLcCXHgE0xAwJiWszEk5GMSl1Ps9wjkoA&oe=68BDFA7C",
    "https://scontent.fknu1-5.fna.fbcdn.net/v/t39.30808-6/514260635_10088338521272903_5404347508617083050_n.jpg?stp=c0.293.713.713a_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=Mfqw4DtOr-sQ7kNvwGDzxMq&_nc_oc=AdkSRp2Q2iCMI5fyKInVCJGeSB8QvEHPGB7LZ8VIx9YvKOdG6r3jvVftnfSX5v5cERlv3vlQL472aHtPtC9T13LZ&_nc_zt=23&_nc_ht=scontent.fknu1-5.fna&_nc_gid=G3fFUtAd-I3ICqZXQwJ8ww&oh=00_AfZWbG1Lpn-pWAsyp0H-IY6R08s-LlWz15kcSimjNWzydQ&oe=68BE1377",
    "https://scontent.fknu1-5.fna.fbcdn.net/v/t39.30808-6/514254395_10088338744606214_5340346235206112420_n.jpg?stp=c444.0.713.713a_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=td9Zz9OxCa0Q7kNvwH3aJ5d&_nc_oc=AdkCdss3rFQS1glgw3hCW1SsIY52cUN_RuaHVBxHrB5B_SnIEfLIjxN0VlK_WTN60tT0g9rA19fumNZpSJSNY2XS&_nc_zt=23&_nc_ht=scontent.fknu1-5.fna&_nc_gid=8d8J6aYBuqJ18vrBOeQjtQ&oh=00_AfZXhprup24m057uk4WtPTVccUF3hb-mkD6ACwZ65z5dtg&oe=68BDF999",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/496555408_9704518876321538_2343302171796882244_n.jpg?stp=c0.372.922.922a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=50ad20&_nc_ohc=X6loEAxUkCgQ7kNvwFGzvcW&_nc_oc=AdmzvnCZXJdnu6C8E4Z0UnuIMo4WmKAP2OE0IXwtE2vnw5O-0J09N60R3sJzM5A29Ljg77QIBdM-eprWD-EoXpiZ&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=rsiIsTDfXtZYzb72MDNG4g&oh=00_Afa90wwbe4UIjhjZETEPFqqC31Gp9UeUWkguwLpqWhUBPg&oe=68BE4761",
    "https://scontent.fknu1-3.fna.fbcdn.net/v/t39.30808-6/496056662_9704519259654833_2512578204643924971_n.jpg?stp=c563.0.922.922a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=kfJGOPfpzZ8Q7kNvwENz86m&_nc_oc=Adkgg0H0esXuqbp3CQ5EGKl0rD3-ZWjlQGHGwyBdEz8USXxig7lGly6f4CIVDYwwj2N3zDHXOkhHIFV0DPtVkNaY&_nc_zt=23&_nc_ht=scontent.fknu1-3.fna&_nc_gid=W_GL72fYim8_EikkdygLOw&oh=00_AfYhmIxuizvSAX858gV0VoXjkNSPo3vvKWO-zpA6dEc4Bg&oe=68BE59BB",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/496096952_9701312169975542_5313538363851787286_n.jpg?stp=c0.86.780.780a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=db443f&_nc_ohc=50p84fK03IAQ7kNvwGXaZKj&_nc_oc=AdmIPKXvi49DM61DMTE7OiXwKHAv7zJauO8wMkyYLCyGQID9yuL9QFWYkJ9VRCFMgx91PsoqMfw8dcz60gy8oP2E&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=6BZxw0TgBPH2LD2gdVSVvg&oh=00_AfY1A0fKgv-JBkU1p7kYl_U-H_L_PGnkVvemNlPmfmVHlQ&oe=68BE6AB1",
    "https://scontent.fknu1-3.fna.fbcdn.net/v/t39.30808-6/491429316_9514859091954185_4700917694225098720_n.jpg?stp=c440.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=vEaoFd7NW4EQ7kNvwFWoNZ5&_nc_oc=AdlOiS5tjp9vjHXgLy3Xb9mgggA89yf6uBfk-_ngJsDoICdT7b4xGGIdu1Nxs-LBtaRq9Q8EMWOABZh_YgRCQQpL&_nc_zt=23&_nc_ht=scontent.fknu1-3.fna&_nc_gid=1A3RQ7ICMWX_LS8Gl1IfvQ&oh=00_AfYNZ4AU8vS7fk1Aw4wEXkpbbF8EbDZLSreScSKDQ82GBw&oe=68BE50A0",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/491800188_9514858928620868_7930653956606393609_n.jpg?stp=c440.0.721.721a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=bSfG44QMPzMQ7kNvwEBMGdr&_nc_oc=Adk3Uhoxu0KrwFWBw9jNtq-kZ-O6px-7BmTN2T4_1Gdv2n8XfQ2Gir-W_2HNU8t9jzNs6s9u2oZW7jZ0VnuP0RrF&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=-6ZZMzSFwBy47CDK1960kQ&oh=00_AfYnfSd_-T1w-IXv_vJzHH-QnJvUNkyZc9ZHgxV8My7gOw&oe=68BE58EE",
    "https://scontent.fknu1-3.fna.fbcdn.net/v/t39.30808-6/491824668_9514857281954366_6537399852664883787_n.jpg?stp=c0.210.521.521a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=TGL30STzUB8Q7kNvwF4jk5d&_nc_oc=Adk1BMVwRxIN7sYwcJKq-J7IKsZYxVdl0MXNo0VtjgTBEvUb-L90ZgVnA8e_X0_6ECZjF_XlZk3SVnyzHq5LXq0c&_nc_zt=23&_nc_ht=scontent.fknu1-3.fna&_nc_gid=se35H33I5ifkiNtw4x_bYA&oh=00_AfaWxuJuIee8S0f68XdlvuJiZs1nfKfRbo-Lo8Xy8qICNQ&oe=68BE5528",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/490406927_9475119039261524_1463455329698952532_n.jpg?stp=c0.95.864.864a_dst-jpg_s206x206_tt6&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=lzhSLRZr6XUQ7kNvwECd4eF&_nc_oc=AdmMssrIk_ZFTQUXE90wNxIJla7TBMffygSaXuw6uCA7L7iHBHhnihNHRo76cmqC6i0VpA7rVBPfhhn34kBBENNC&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=KX_Pl_zt5ywnoGe0Wc7PTw&oh=00_AfaaM7QBz1bKimiL9ub39Y1ck-08OoQBDJEJH86sE7vmrw&oe=68BE6A4F",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/490169258_9487396014700493_182911687903451795_n.jpg?stp=c563.0.922.922a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=50ad20&_nc_ohc=Li4Kuydy-G8Q7kNvwHt9z61&_nc_oc=AdnjzHgJX6r_6DUL38TjUD3qkzkF3a2NNK7tLwbcuUqz_h2y3mKhReE0FD4SA_avf5npE_8qIzRU2GXCGqu38-6F&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=nbJjUfK7kQpha_pqM7oU5w&oh=00_AfaFfaqQNNqu9yRDl6cnavv2S1lL_Gb8G1mBK2zPvXDw0w&oe=68BE3AC4",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/491832667_9514855878621173_7407306020261323573_n.jpg?stp=c200.0.1200.1200a_dst-jpg_s206x206_tt6&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=mlGLC5n3MEMQ7kNvwHY_O31&_nc_oc=Adkg6jwMejHDEj4qQ8um9n1tE1CwvL4LjRRLaqKAhTGYzval0DG4oGg-0WzLF764cRDFYHbkArScWzreARZcPhH_&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=bXJgpK-216GA5fJiCDFxug&oh=00_AfYi1MmRseV1mbLCP61gJWQVytT35pf33ByW71lsyxsGDw&oe=68BE497C",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/494353370_9607175219389238_3020383210452683273_n.jpg?stp=c0.232.576.576a_dst-jpg_s206x206_tt6&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=NhCaZc7EWNYQ7kNvwEOv1Aq&_nc_oc=Adl4wTg7uDXK_0lJK3xrRLNTzhM0tqB38E__OlPcViedjgRr2HbcZ6RJp1Lcn4ys1SNnz1jH-AptZVaSOf2vPnXQ&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=bPFydueQXjLdgsUqdz_0xA&oh=00_AfZgKGv5ACty3EVnw2XLLrf21fXeaJTq0HJ_PjLnGKgNSA&oe=68BE5773",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/495124069_9607175189389241_3696741037770170923_n.jpg?stp=c120.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=50ad20&_nc_ohc=cM9QkMT71jIQ7kNvwFLpsTM&_nc_oc=AdnpVPB_tBLupXOgDm1wwYlw0c13QVDfrxMAF0_Toyc36xh61FThP_Qz1g6PGfiRsgLCPOQxfHL45Bd9b_SICgNx&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=xkIa4qJbyqWA4e59MbRckw&oh=00_AfYgxGvbSNtJASCaEAfqXhZl3RjvWXYTlsN_IcuDshzx7g&oe=68BE6932",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/491841506_9514855648621196_7913977875366528947_n.jpg?stp=c440.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=50ad20&_nc_ohc=w2_8ELepMIIQ7kNvwGuJpKf&_nc_oc=AdkiIIpLPY1CyRUAoQtyxaWPgYvR1NHHjJ-ZYEasnnCXg5RiJcdcRFDY3EJIyAgP3s-LbVAYTjzUhlnhIpFxFDcK&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=X0EOviKWmoynaddOmtFcXQ&oh=00_AfZR_ayDLnVBNq8_zc2PlJUGNTnpptTp3zHszWD7TmI5Vw&oe=68BE44B5",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/491830175_9514857471954347_2654035741538952922_n.jpg?stp=c350.0.899.899a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=_FNxcOEUELEQ7kNvwHMdYEw&_nc_oc=AdnnhMBtsk1AAyvIXtEEULuFbQpIFmaJSlmgCPBUW-Zo-vxeOgqIPxET9VDUi5Ay94sEWt7IkufYcpp4oJTIL96B&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=-ACbYgcBg-PmKXxrtj0yww&oh=00_AfbP298ZTeGkzWHeWCh6m-tW858WZRz06BIjiyn39uw4BQ&oe=68BE4215",
    "https://scontent.fknu1-3.fna.fbcdn.net/v/t39.30808-6/491429316_9514859091954185_4700917694225098720_n.jpg?stp=c440.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=vEaoFd7NW4EQ7kNvwFWoNZ5&_nc_oc=AdlOiS5tjp9vjHXgLy3Xb9mgggA89yf6uBfk-_ngJsDoICdT7b4xGGIdu1Nxs-LBtaRq9Q8EMWOABZh_YgRCQQpL&_nc_zt=23&_nc_ht=scontent.fknu1-3.fna&_nc_gid=1A3RQ7ICMWX_LS8Gl1IfvQ&oh=00_AfYNZ4AU8vS7fk1Aw4wEXkpbbF8EbDZLSreScSKDQ82GBw&oe=68BE50A0",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/490751891_9514859165287511_9148710032350669751_n.jpg?stp=c0.86.780.780a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=6JroMryPjIcQ7kNvwFL7DkU&_nc_oc=Adm5XRteDBJzdkhwFLPU5gr6vjknM-Naf_oOtKlzr6A2MTVj3dZ6ma-ccz8JXkCKZeKYhEs5-B11XYJ77wxG5xtk&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=wtV-nSKqVBKRIr25WQGVNw&oh=00_AfY43Gy47o-qPy8Jr4Z4QOJny1RUBy25goEofAy8IeNuGg&oe=68BE51F7",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/494722722_9607175419389218_2105648819141981813_n.jpg?stp=c120.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=50ad20&_nc_ohc=EzbvXyeAieUQ7kNvwF_jvyS&_nc_oc=AdnfYlWSCX2DmKLlEUof97H7gSO3YfrGNb-knIKlu33Ywfi21fPz0oc8AZnc_2m1mGN-aAj-_i-A6LmcXO0llWRp&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=VOZa_CG4xFs2i_4inOnrig&oh=00_Afal46rpOZ_4D-jpZbYhq1TjDSKvUSNsLa0SoDCueFLaRg&oe=68BE43E7",
    "https://scontent.fknu1-2.fna.fbcdn.net/v/t39.30808-6/494822492_9607173392722754_2586865532087675650_n.jpg?stp=c563.0.922.922a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=cprshPYnuLMQ7kNvwH3la9X&_nc_oc=Adlus5Sd3Hbg0I_yNfBIB0Z9BTvcC8Shk0SfBRat-f9qdXmUj2UC32ZjRbaa92_IGkNA-gguqwVITsxWNwSwyfAW&_nc_zt=23&_nc_ht=scontent.fknu1-2.fna&_nc_gid=R6ykah0UtB8FmKwP87RSfA&oh=00_AfYtZ0OeXe9yiQzCULapjLyCuY6u27VzC8C1cZXiFYcl1A&oe=68BE6023",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/494282717_9607173622722731_1286881598783695845_n.jpg?stp=c546.0.956.956a_dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_ohc=B1jfY2PN3zgQ7kNvwFCURKr&_nc_oc=AdnZGbG9_CWjxydOQj9-om3yoPOu_y9d6tF1_2icM5zbLlTk8YtQ-_CfTy13QZf_WYiecNku12JfE-Myz9VoSXTC&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=zPsW3pajtDKDiTeFnjTjiQ&oh=00_AfZhov1T0Cwk-viCs_OG14kTvc3G-nVy-6yY4phSeRGpZg&oe=68BE5345",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/494353370_9607175219389238_3020383210452683273_n.jpg?stp=c0.232.576.576a_dst-jpg_s206x206_tt6&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=NhCaZc7EWNYQ7kNvwEOv1Aq&_nc_oc=Adl4wTg7uDXK_0lJK3xrRLNTzhM0tqB38E__OlPcViedjgRr2HbcZ6RJp1Lcn4ys1SNnz1jH-AptZVaSOf2vPnXQ&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=bPFydueQXjLdgsUqdz_0xA&oh=00_AfZgKGv5ACty3EVnw2XLLrf21fXeaJTq0HJ_PjLnGKgNSA&oe=68BE5773",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/495019962_9607177552722338_1037407079491522674_n.jpg?stp=c0.185.720.720a_dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_ohc=sgwlL6CjST0Q7kNvwEwYLe2&_nc_oc=AdlbVOuc6ro9lTE1zyaLemSHf6Ez5Do7A5ahQ0EAei9v11VUERRrk5ryUCBIGrEFVa68tyYVm5wCZ3LahekuMIFl&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=ALloQOoRPKelRUqlRWhU6A&oh=00_AfbPtyLbRaqiKG3ZSzw96rOX5fGu8rfjwtIfcuU4CGtjJQ&oe=68BE6696",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/496096952_9701312169975542_5313538363851787286_n.jpg?stp=c0.86.780.780a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=db443f&_nc_ohc=50p84fK03IAQ7kNvwGXaZKj&_nc_oc=AdmIPKXvi49DM61DMTE7OiXwKHAv7zJauO8wMkyYLCyGQID9yuL9QFWYkJ9VRCFMgx91PsoqMfw8dcz60gy8oP2E&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=6BZxw0TgBPH2LD2gdVSVvg&oh=00_AfY1A0fKgv-JBkU1p7kYl_U-H_L_PGnkVvemNlPmfmVHlQ&oe=68BE6AB1",
    "https://scontent.fknu1-3.fna.fbcdn.net/v/t39.30808-6/496056662_9704519259654833_2512578204643924971_n.jpg?stp=c563.0.922.922a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=kfJGOPfpzZ8Q7kNvwENz86m&_nc_oc=Adkgg0H0esXuqbp3CQ5EGKl0rD3-ZWjlQGHGwyBdEz8USXxig7lGly6f4CIVDYwwj2N3zDHXOkhHIFV0DPtVkNaY&_nc_zt=23&_nc_ht=scontent.fknu1-3.fna&_nc_gid=W_GL72fYim8_EikkdygLOw&oh=00_AfYhmIxuizvSAX858gV0VoXjkNSPo3vvKWO-zpA6dEc4Bg&oe=68BE59BB",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/496555408_9704518876321538_2343302171796882244_n.jpg?stp=c0.372.922.922a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=50ad20&_nc_ohc=X6loEAxUkCgQ7kNvwFGzvcW&_nc_oc=AdmzvnCZXJdnu6C8E4Z0UnuIMo4WmKAP2OE0IXwtE2vnw5O-0J09N60R3sJzM5A29Ljg77QIBdM-eprWD-EoXpiZ&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=rsiIsTDfXtZYzb72MDNG4g&oh=00_Afa90wwbe4UIjhjZETEPFqqC31Gp9UeUWkguwLpqWhUBPg&oe=68BE4761",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/499245698_9752466584860100_347390881158576262_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=50ad20&_nc_ohc=7pbwmO4zbisQ7kNvwFAO5-S&_nc_oc=AdmwMOLdnWWawZpZVYVY0JS8SztANaLHT6ghHvmF4f-Tw_0qyuBY22Z3dS8NRZkGncq7FYVkOOP0mBob9PouzVdO&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=QRPz-T3xpJvdEIPhdEh-gA&oh=00_AfbgOn2_4DYqj5duxJCUfwaeHPSuQ8Vf3-IVqXAkFQFZvQ&oe=68BE51B8",
    "https://scontent.fknu1-2.fna.fbcdn.net/v/t39.30808-6/513936329_10062683617171727_3661673549085350092_n.jpg?stp=c280.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=l9nQq4ToIdUQ7kNvwFGTMZv&_nc_oc=AdkCbEYY5LVSWtbSeEoypnAHZJYKaxwpNrP2UANPnzEqcEn7XbCkgs9HxEKuBdquMXv5nL89pFowp3dep6dI3z01&_nc_zt=23&_nc_ht=scontent.fknu1-2.fna&_nc_gid=RarsX4qr5qO0GSmKZk_vyg&oh=00_Afb6EVnDBDQdL-nsIN-t7DF4TeObnH1mtkO4uYfyVPAucA&oe=68BE6044",
    "https://scontent.fknu1-2.fna.fbcdn.net/v/t39.30808-6/499242248_9752466354860123_218717652134249534_n.jpg?stp=c0.185.720.720a_dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=50ad20&_nc_ohc=3YPX44ODpkMQ7kNvwE9vMiy&_nc_oc=Adm8miFBKZWjIlRfilbfFTS-j8zEnsX7_G1CTmpAQV9-HbbpkrfZlu9kcTvpe4AvA2yGIc3J4BJHeMaZANrCUvP1&_nc_zt=23&_nc_ht=scontent.fknu1-2.fna&_nc_gid=1NR0exkb6LBeg18v4DFuKg&oh=00_AfaTiAMwA4N4xzTlfJ55ZgOZXQ4-a76B-n86vI1_3okDjg&oe=68BE56BE",
    "https://scontent.fknu1-5.fna.fbcdn.net/v/t39.30808-6/514701716_10085192301587525_6593254474490352135_n.jpg?stp=c849.0.1367.1367a_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=nKe5nbDdw78Q7kNvwGCatmq&_nc_oc=Adlt2QWDpCBRd39qHRUDv7dpxOMvaveKU9KkwjQwOeUAEVvEy_4lOfs1uwxe1GAZbV7lbPILIy8yPt_KuFisRfrH&_nc_zt=23&_nc_ht=scontent.fknu1-5.fna&_nc_gid=QqmWxO-s48tz2QkoDKtUnw&oh=00_AfZiJQ3Jbs3VT5Ejh_F4dZaTeH7jFFKDLu_0D43sRUPEtw&oe=68BE5F78",
    "https://scontent.fknu1-3.fna.fbcdn.net/v/t39.30808-6/514360850_10085197748253647_221335866087986660_n.jpg?stp=c849.0.1367.1367a_dst-jpg_s206x206_tt6&_nc_cat=110&ccb=1-7&_nc_sid=50ad20&_nc_ohc=sVwDBzfNRwQQ7kNvwE3SX-P&_nc_oc=AdmVBHk-VLUh9Kj2iFDUGPV3XBBg_HFLlCFMIf2cFLvxnwFSTie71qdLl_iipoanEXsMcz_5GunK663Cyv1xfx8Q&_nc_zt=23&_nc_ht=scontent.fknu1-3.fna&_nc_gid=jJI5dnsB3jjSk5z61rTlKg&oh=00_AfbKRfRe3kVtZF1VEblsOWKsz7UR_Nor-1W-VI_Csj-u_w&oe=68BE5043",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/514193548_10085197984920290_8313720856631774636_n.jpg?stp=c0.284.739.739a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=zq-py-zLWT0Q7kNvwGK725Q&_nc_oc=AdkTSxhEnD1d5sl5gjFbkE6a9M3Fy5vqMX94HRjD64A_2Os8qh8e6DhwoUXyUjV1SQWEuHVbzpaVjVe-vLiDfDm6&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=OtR6xJK2Ltr1kBxeuUzkwQ&oh=00_AfbBQlXpL7HFR7IrIt9HKuln_0IFZtgARFTHT4ZFZvnBEA&oe=68BE5D03",
    "https://scontent.fknu1-2.fna.fbcdn.net/v/t39.30808-6/514396650_10085325934907495_4664190862240115453_n.jpg?stp=c181.0.719.719a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=thoYZBYMx-EQ7kNvwGNRJeM&_nc_oc=AdmnhMPitFJEFS03XB_qSwIl-WjyMJSzQI1ph52klLleqEGl4taEZ6NryvnCNWwxfyzYr630I4dufr_8KLiZrE6X&_nc_zt=23&_nc_ht=scontent.fknu1-2.fna&_nc_gid=k3HvQxyi4zm7YkKvikVkcg&oh=00_AfYyr7a-MbmIrLYILdfORAXv-ThTue3ndDaiRgkNIJ7JVA&oe=68BE4C31",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/514344686_10085345538238868_7904602047232487679_n.jpg?stp=c441.0.719.719a_dst-jpg_s206x206_tt6&_nc_cat=101&ccb=1-7&_nc_sid=50ad20&_nc_ohc=ywFbyBSQTrsQ7kNvwEpD5ai&_nc_oc=Adn46zggBnTvF3I6t6h_MCOKOooGlLg1c4c9-tmdUUixuqWYT3FPihqIO3Br3xLoEe93NPMeR7QQHRBo-F3KxkZc&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=02jC9Q_mkqH2cAFgWrsz6Q&oh=00_AfYpVbZA_QvyyLqqJ5rQbw6eJQLHEe6rkI-blrnHYUPSXw&oe=68BE64C8",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/514669562_10085345351572220_2628958651402606109_n.jpg?stp=c317.0.519.519a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=50ad20&_nc_ohc=MVhbEqLHyd0Q7kNvwGwFJ1m&_nc_oc=AdmqcRJbO9kxWipEhL2RzmQDgBDmpXtlzQ2PDBb_q6zRkmd9TY_tnzgdQ9YA_jARAPDte-TjJelFzLzqLE4UHO7m&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=CYgVwgkwsmMTCScN_FEMCQ&oh=00_Afa_2_3VPCMAVueLIIA_Cm04VirwPI_QTLpKtk9HOB5odw&oe=68BE6461",
    "https://scontent.fknu1-2.fna.fbcdn.net/v/t39.30808-6/514657384_10085345598238862_2166029872618988940_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=50ad20&_nc_ohc=P9-WlpvnP4MQ7kNvwH-Nr35&_nc_oc=AdkHUJa45DxhQgdDmnQPH7bq1urgDODOWM1NgGBLFHbrB6cnKBbHBP-13TfqMvEGH8DP1A3Ujvm0WBfSoNxhS3aq&_nc_zt=23&_nc_ht=scontent.fknu1-2.fna&_nc_gid=lBizm0Stb0WE2Tvy-qmpzg&oh=00_AfZvg4aDoEOS-gdDSubQSCMaYVANgBqssY1jucciQ-XMJA&oe=68BE405A",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/514981973_10085353044904784_29312172522620619_n.jpg?stp=c440.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=714c7a&_nc_ohc=n5hfaAEuYLcQ7kNvwGjkU8T&_nc_oc=Adk8KQOk_V_4JbkZ5zIR3ZpTTYuGJfLp7GGFltatuF1_XQ_-hVZ_j4R-FeVcnsmFj7Knc7f393r5N-P8PSaW0G0V&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=c48nlBDHjaHsRF4fiRdsyQ&oh=00_AfYwFETn6Vl7FLMD5Gzwtu4zcVTqnvL7xoezcp-ZWcwYkQ&oe=68BE4E9E",
    "https://scontent.fknu1-5.fna.fbcdn.net/v/t39.30808-6/515303407_10085352871571468_4433373786707507191_n.jpg?stp=c130.0.780.780a_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=714c7a&_nc_ohc=1KlecwuIhHEQ7kNvwF__nz7&_nc_oc=Adky_YbkzbhaUceKzwjsR25AwbtSgTI7NqY4qeJimhM-2R8hS3HPD__IDf5e0SbdLS7rx0L028MXgNwVh_bNZtPV&_nc_zt=23&_nc_ht=scontent.fknu1-5.fna&_nc_gid=YPjHuEjk6YPtC491zMDklQ&oh=00_AfZ7IomJjWLlkJ3udOrkadys_2wY3e9llILn7m_WuS_LZw&oe=68BE3885",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/513862811_10085354191571336_2764186623375138648_n.jpg?stp=c431.0.739.739a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=KPojocVRsyIQ7kNvwEf0IXF&_nc_oc=AdlJco6cs6nI-zNUhOBlKa9-D-PQMaMgL4qsXGD9Ck7ekkQzv1AHmH49Lhst2sxfHiVUNuDsR7oRHRGYB0p8S3_O&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=U4NPi40D9ZyAG7lECoyCMg&oh=00_AfYu6EkG6iJg5cmxrB-tUjhIQXO3t68SQtYk8jLKtwSseQ&oe=68BE6240",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/514537447_10085390181567737_6237352915682974664_n.jpg?stp=c439.0.722.722a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=34aihnAPWQcQ7kNvwFJvlhg&_nc_oc=Adm4StcY2zzHgS25E6V92q_gQvK7FyK4x7S6JbhAZ1hirMb7Ym0aZppkayY6nl4kgqd-VuQsV7fHJqhqJXABIhen&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=72W4G88NRWQCrXNokvpjzA&oh=00_Afbc51MoLFZTJg7QOfHtxz-bjJLqds3GiLo4RbOb-wJXZQ&oe=68BE5738",
    "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/514058445_10085392541567501_7148190651093504696_n.jpg?stp=c160.0.960.960a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=8mi1RqPeiXAQ7kNvwFb1yuW&_nc_oc=AdmBu8OmCna-qTXPu6EWadS1lOwKuTnlw9Pj23A6XIadru3ovA8eg01fPbo4uc4d9hdzrUN3Y2Kr2B89Tt0_2sMa&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=1XPTevlFQcF2-0p8eqRPTw&oh=00_AfYFEX1O70oqHXPSDYVNft3BW-1yse2_LSuX5ad4BU3nsQ&oe=68BE3AC5",
    "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/514472417_10085390201567735_6422071639046337928_n.jpg?stp=c0.105.963.963a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_ohc=S_fVI4M94S0Q7kNvwEGG-IJ&_nc_oc=Adk7SoyHvDwaNU1Bbyd6vpCzV9Qi8XJVeSbTWgW_U3hYdBgCz5H1--zN8t5irOHMl8HwWJmMUitd5bMPNgDSMVQl&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=EBOMzFa3Ga7xZ8huE9rpKw&oh=00_AfZzO3v0k1iaTZoMkSOKTC9i5vdjcHwzot49GW7aDzb2Xg&oe=68BE3DC3",
    "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/514746715_10085390218234400_7384313700116775763_n.jpg?stp=c431.0.739.739a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=714c7a&_nc_ohc=VrmjEuLEw8oQ7kNvwETGD2a&_nc_oc=AdmIh8ATJ0Vjkd2XFek507p-LxoaX22q2Zd7nr3LrUe-1ObERvL8rXZp5_UAsgSU0a-uhwEFm6ddmj27uz0QDNsX&_nc_zt=23&_nc_ht=scontent.fknu1-6.fna&_nc_gid=LAC3txtDzjcZZlcIC-XdLQ&oh=00_AfYogq4VQ5lI38zhZhMuH0PPCCrXkHsDrW6hAI8fMe4msQ&oe=68BE5235",
    "https://scontent.fknu1-5.fna.fbcdn.net/v/t39.30808-6/491405344_9507103992729695_8469391802276094798_n.jpg?stp=c352.0.576.576a_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=714c7a&_nc_ohc=5P_m55Y9zLcQ7kNvwHiXpYZ&_nc_oc=AdltatXhUpQHOtSzEEJzSZvOAGk45bcSvRJFll-qr1oBh_L1PZCMsOETNOh-CWr3L8nqlid5x8GxEDztUoeRVoxu&_nc_zt=23&_nc_ht=scontent.fknu1-5.fna&_nc_gid=R1Z5YSwsx8y-mlKOOKrLKw&oh=00_AfbiCz6Nc3w--bOKGGwffQoeZkUYQIpmOSWgm9F9kL9K6w&oe=68BE601C",
   "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/491955450_9507104089396352_1867025887038811031_n.jpg?stp=c352.0.576.576a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=9UlZOcQNXFcQ7kNvwFgAtyy&_nc_oc=AdnguXUylm5NH3QvQOxh27Px12jLa5gO0XYSqM5pQQ_4E-hEqUbz6MNQj1AHqT6O8hXqb8J2IXrJmLeMTBvIj7FD&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=MAt3xGiH3WmO7w8cZp-PgA&oh=00_AfYWCj3RcWP5XBKtyW1IOk2Bbt5bT8zVkUiEjhvjDh7e_Q&oe=68BE5CAF",
    "https://scontent.fknu1-5.fna.fbcdn.net/v/t39.30808-6/490943449_9514854051954689_8964581665457461351_n.jpg?stp=c280.0.480.480a_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=4IZczTjZEG8Q7kNvwEClR2q&_nc_oc=AdlPG5QndSgEUrWVf0RshEGbVWEngDKpMRyS8UuUXLQDPY9M8Ar3Fw2X_9IvKwaXF1idgLOcJqUwY6vz6bVvciSm&_nc_zt=23&_nc_ht=scontent.fknu1-5.fna&_nc_gid=syN01bfowNnj-Je8-MueIw&oh=00_AfaeLj_eKzCbY46dR3LUP--5nkOL8-ijbMfvBRUVvrHAzg&oe=68BE4957",
     

   
    // Add 40+ here...
  ];

 const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const rowsLarge = chunkArray(images, 10); // Desktop
  const rowsSmall = chunkArray(images, 4); // Mobile

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="border-l-4 border-red-500 pl-2">
              Our Program Images
            </span>
          </h1>
        </div>
      </div>

     
      {/* Image Rows - Mobile (4 per row) */}
      <div className="md:hidden space-y-6 overflow-hidden">
        {rowsSmall.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex"
            initial={{ x: rowIndex % 2 === 0 ? "0%" : "-100%" }}
            animate={{ x: rowIndex % 2 === 0 ? "-100%" : "0%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {row.concat(row).map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-28 h-20 mx-1 rounded-lg overflow-hidden shadow-md transform transition duration-500 hover:scale-110 hover:shadow-xl cursor-pointer relative"
              >
                <img src={img} alt={`Course ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Image Rows - Desktop (10 per row) */}
      <div className="hidden md:block space-y-10 overflow-hidden">
        {rowsLarge.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex"
            initial={{ x: rowIndex % 2 === 0 ? "0%" : "-100%" }}
            animate={{ x: rowIndex % 2 === 0 ? "-100%" : "0%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {row.concat(row).map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-56 h-40 mx-2 rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer relative"
              >
                <img src={img} alt={`Course ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageWall;