let isAuthenticated = false;

export const setAuth = (value) => {
  isAuthenticated = value;
};

export const checkAuth = () => {
  const token = localStorage.getItem("key");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const isAdmin = () => {
  const tipo_pessoa = localStorage.getItem("tipo_pessoa");

  if (tipo_pessoa === "admin") {
    return tipo_pessoa;
  } 
  if (tipo_pessoa === "cliente") {
    return tipo_pessoa
  } 
  if (tipo_pessoa === "parceiro") {
    return tipo_pessoa
  }
};
console.log(checkAuth());
