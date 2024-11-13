<template>
  <footer>
    <div id="footer_content">
      <div id="footer_contact">
          <p>Social Midia</p>
          <div id="footer_social_media">
            <a href="#" class="footer-link" id="instagram">
            <i class="fab fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="#" class="footer-link" id="facebook">
            <i class="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="#" class="footer-link" id="whatsapp">
            <i class="fab fa-whatsapp" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div id="footer_copyright">
      &#169
      2024 all right reserved
      </div>
  </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  letter-spacing: 1px;
}

footer {
  width: 100%;
  color: lightgray;
}

.footer-link{
  text-decoration:none;
}

#footer_content {
  background-color: aquamarine;
  flex-direction: column;
  align-items: center; 
  text-align: center; 
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 1);
}

#footer_contact {
  margin-top: 1rem; /* Ajuste o valor conforme necessário */
}

#footer_social_media{
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#footer_social_media .footer-link{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  transition: all 0.4s;
}

#footer_social_media .footer-link i{
  font-size: 1.25rem
}

#footer_social_media .footer-link:hover{
  opacity: 0.7;
}

#instagram {
  background: linear-gradient(#7f37c9, #ff2992, #ff9807)
}

#facebook {
  background: #4267b3;
}

#whatsapp {
  background: #25d366;
}

#footer_copyright{
  background-color: blueviolet;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 1)
}
</style>