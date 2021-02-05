const noScroll = (state) => 
{
    switch(state) {
        case 'NOSCROLL': 
            document.body.style.overflowY = 'hidden'; 
            break;
        case 'SCROLL': 
            document.body.style.overflowY = '';
    }
};
export default noScroll;