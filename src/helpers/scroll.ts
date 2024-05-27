export function scroll(id:string) {
  let scrollableDiv = document.getElementById(id);
  if (scrollableDiv) {
    scrollableDiv.scrollTo({
      top: scrollableDiv.scrollHeight,
      behavior: "smooth",
    });
  }
}
