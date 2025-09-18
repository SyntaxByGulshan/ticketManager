const statusOfSearchBar = (): string => sessionStorage.getItem('search') || '';
export default statusOfSearchBar;