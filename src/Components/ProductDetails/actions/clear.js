const clear = (e) => {
  let children;
  if (e.target.className === 'size-gallery') {
    children = e.target.children;
  } else {
    const sizeGalleryDiv = e.target.parentNode;
    children = sizeGalleryDiv.children;
  }
  [...children].forEach(div => 
    div.classList.remove('selected'));
}

export default clear;