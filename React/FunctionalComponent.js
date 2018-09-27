export function handleClick(e) {
  console.log("The link was clicked.");
  const value = e.target.value;
  this.setState({ key: value });
}

export function handleInputChange(e) {
  e.preventDefault();
  console.log("handle input");
  const key = e.target.name;
  const value = e.target.value;
  this.setState({ [key]: value });
}
