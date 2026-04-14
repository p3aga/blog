const siteConfig = ({
  Url: 'https://localhost:4321',
  Base: "/",
  Lang: "pt-BR",
  SiteName: "P3AGA",
  Description: "Pedro Henrick personal portfolio/blog :)",
  Author: "Pedro Henrick Queiroz",
  Year: 2026,
})

const menuLinks: { path: string, title: string }[] = [
  { path: "/blog", title: "Blog" },
  { path: "/about", title: "Sobre" },
];

export { menuLinks, siteConfig };
