# 🎮 Plataforma Inclusiva de Eventos de eSports

![Banner do Projeto](./src/assets/banner.png)

> Uma plataforma para cadastro e gestão de eventos de eSports com foco na **inclusão de pessoas com deficiências sensoriais**.

---

## 🧠 Visão Geral

Esta aplicação foi desenvolvida com o propósito de promover **acessibilidade e inclusão digital** no universo dos esportes eletrônicos. Pessoas com deficiência auditiva e visual podem utilizar a plataforma com facilidade, graças às ferramentas e práticas adotadas durante o desenvolvimento.

---

## ✨ Funcionalidades em Destaque

- Cadastro e gerenciamento de **eventos públicos ou privados**
- Autenticação com **JWT**
- Interface construída com **Vue.js** (Vue CLI)
- Acessibilidade com ferramentas como **Axe-core**, **ARC Toolkit** e **V-Libras**
- Interface intuitiva, com **componentização**, suporte a **leitores de tela**, **modo de contraste** e **uso de landmarks semânticos**

---

## 🖼️ Capturas de Tela

### 📌 Página Inicial (Eventos Públicos)

![Página Inicial](./src/assets/home-preview.png)

### 🧾 Dashboard com Eventos Cadastrados

![Dashboard](./src/assets/dashboard-preview.png)

> ✅ *Você pode adicionar imagens em `src/assets` com o nome exato acima ou personalizar.*

---

## 🛠️ Tecnologias Utilizadas

| Camada       | Tecnologias                                                                 |
|--------------|------------------------------------------------------------------------------|
| **Frontend** | Vue.js 3, Vue Router, Vuex, FontAwesome, Tailwind CSS                       |
| **Backend**  | Node.js, Express, MongoDB, JWT, Multer, Mongoose                            |
| **Acessibilidade** | Axe-core, ARC Toolkit, V-Libras, padrões WCAG 2.2                          |

---

## ♿ Acessibilidade

Foram adotadas práticas reais de acessibilidade:

- Uso de landmarks semânticos (`<header>`, `<main>`, `<footer>`)
- Correção de contraste e textos alternativos (`alt`)
- Testes com leitores de tela e ferramentas automatizadas
- Integração com **V-LIBRAS** para tradução automática para Libras

---

## 🚀 Como funciona (sem rodar)

1. A página inicial exibe eventos públicos.
2. Usuários podem se cadastrar e logar.
3. Ao logar, podem criar novos eventos, definir visibilidade (público/privado), editar perfil.
4. Tudo com foco em **simplicidade de navegação** e **acessibilidade**.

---

## 📁 Estrutura da Aplicação


