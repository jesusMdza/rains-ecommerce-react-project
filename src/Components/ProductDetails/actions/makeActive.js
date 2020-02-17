import clear from './clear';

const makeActive = (e) => {
  if (e.target.className === 'size-container available') {
    clear(e);
    e.target.classList.add('selected');
  } 
}

export default makeActive;