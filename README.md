# Tensai 日本語

Web App (Single Page Application) para o aprendizado das **3000 palavras mais frequentes do japonês**.

## ✨ Funcionalidades

- **15 Módulos** × **10 Aulas** × **20 palavras** = 3000 palavras.
- Aulas no estilo **Flashcards** com:
  - Palavra em Japonês (Kanji/Kana) em destaque;
  - **Furigana** ocultável/visível com um clique;
  - Tradução do significado;
  - **Frase de exemplo real** com tradução e **áudio** (leitura em japonês via Web Speech API);
  - Botões de feedback **"Ainda não sei"** (repete no fim da aula) e **"Já sei"** (avança).
- **Dashboard** com progresso geral: módulos concluídos, palavras aprendidas e ofensiva (streak).
- **Dark Mode** automático (preferência do sistema) ou manual.
- **Persistência local** via `localStorage` (progresso, palavras conhecidas e streak diário).
- **100% responsivo** (Desktop e Mobile).

## 🚀 Como rodar

Basta abrir o arquivo [`index.html`](./index.html) no navegador — sem build, sem instalação.
Construído com **React + Tailwind CSS + Lucide Icons** via CDN.

## 🗂️ Dados

- A **Aula 1 do Módulo 1** contém 20 palavras reais (com Kanji, furigana, significado e frases).
- As demais palavras são geradas por uma função de mock, deixando o app totalmente navegável.
