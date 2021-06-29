module.exports = {
  theme: {
    styles: './styleguide/styles.js',
    theme: './styleguide/themes.js'
  },
  sections: [
    {
      name: 'Introdução',
      content: 'docs/introduction.md'
    },
    {
      name: 'Documentação',
      sections: [
        {
          name: '🚀 Como executar',
          content: 'docs/installation.md',
        },
        {
          name: '🌐 Demo',
          external: true,
          href: 'https://letmeask-be28a.web.app'
        }
      ]
    },
    {
      name: 'UI Components',
      content: 'docs/ui.md',
      components: 'src/components/**/*.tsx'
    }
  ]
}