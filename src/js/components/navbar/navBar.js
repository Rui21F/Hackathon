import "./navBar.css";

export default function NavBar() {
  const $navMenu = $("<nav>").addClass("navMenu");

  const menuItems = ["Home", "Blog", "Work", "Top Artists"];
  menuItems.forEach((item) => {
    const $menuItem = $("<a>")
      .attr("href", `#${encodeURIComponent(item.toLowerCase())}`)
      .text(item);
    $navMenu.append($menuItem);
  });

  const $dot = $("<div>").addClass("dot");
  $navMenu.append($dot);

  return $navMenu;
}
