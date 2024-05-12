
function prendre_variables() {
  const nbr_variables = parseInt(document.getElementById('nombre_variablesX').value); // combien de variables dans la fonction objective
  const inputContainer = document.getElementById('inputContainer'); // les valeurs des inputs sont par défautl du text, il faut les castent.
  const contraintesContainer = document.getElementById('contraintesContainer');
  contraintesContainer.innerHTML = '';
  inputContainer.innerHTML = '';

  
  const newInputZ = document.createElement('input');
  newInputZ.type = 'text';
  newInputZ.value = "Z";
  newInputZ.disabled = true;
  inputContainer.appendChild(newInputZ);
  const newInputEqual = document.createElement('input');
  newInputEqual.type = 'text';
  newInputEqual.value = "=";
  newInputEqual.disabled = true;
  inputContainer.appendChild(newInputEqual);

  for(let i = 0 ; i < nbr_variables ; i++)
  {
    const inputLabel = document.createElement('label');
    inputLabel.textContent = `X${i + 1}`;
    const newInput = document.createElement('input');
    newInput.type = 'number';
    newInput.classList.add('coeff_x_fonction');
    

    if(i != 0)
    {
      const newInputPlus = document.createElement('input');
      newInputPlus.type = 'text';
      newInputPlus.value = "+";
      newInputPlus.disabled = true;
      inputContainer.appendChild(newInputPlus);
    }
    
    inputContainer.appendChild(newInput);
    inputContainer.appendChild(inputLabel);
  }
}

function contraintes() {
  const nbr_contraintes = parseInt(document.getElementById('nombre_contraintes').value);
  const nbr_variables = parseInt(document.getElementById('nombre_variablesX').value);
  const contraintesContainer = document.getElementById('contraintesContainer');
  contraintesContainer.innerHTML = '';
  
  for(let i = 0 ; i < nbr_contraintes ; i++)
  {
    for(let j = 0 ; j < nbr_variables ; j++) {
      const newInput = document.createElement('input');
      newInput.type = 'number';
      newInput.classList.add('coeff_x_contraintes');
      const inputLabel = document.createElement('label');
      inputLabel.textContent = `X${j + 1}`;

      if(j != 0)
      {
        const newInputPlus = document.createElement('input');
        newInputPlus.type = 'text';
        newInputPlus.value = "+";
        newInputPlus.disabled = true;
        contraintesContainer.appendChild(newInputPlus);
      }

      contraintesContainer.appendChild(newInput);
      contraintesContainer.appendChild(inputLabel);
    }


    for(let j = 0 ; j < nbr_contraintes ; j++) {
      const newInput = document.createElement('input');
      newInput.type = 'number';
      newInput.classList.add('coeff_x_contraintes');
      //const inputLabel = document.createElement('label');
      //inputLabel.textContent = `e${j + 1}`;
     
      j == i ? newInput.value = 1 : newInput.value = 0;

      newInput.disabled = true;
      newInput.style.display = 'none';
      contraintesContainer.appendChild(newInput);
      //contraintesContainer.appendChild(inputLabel);
    }


    const inputLabel = document.createElement('label');
    inputLabel.textContent = " <= ";
    contraintesContainer.appendChild(inputLabel);
    const newInput = document.createElement('input');
    newInput.type = 'number';
    newInput.classList.add('constantes_contraintes');
    contraintesContainer.appendChild(newInput);
    const lineBreak = document.createElement('br');
    contraintesContainer.appendChild(lineBreak);

  }
}

function coeff_x_fonction_inputs() {
  const inputs = document.querySelectorAll('.coeff_x_fonction'); // Select inputs by class
  const inputValues = [];

  inputs.forEach(input => {
    inputValues.push(parseInt(input.value, 10) * -1); // here
  });

  let constantes_contraintes_array = constantes_contraintes();
  constantes_contraintes_array = constantes_contraintes_array.length;

  for(let i = 0 ; i < constantes_contraintes_array ; i++) {
    inputValues.push(0);
  }
  return inputValues;
}

function coeff_x_contraintes_inputs() {
  const inputs = document.querySelectorAll('.coeff_x_contraintes'); // Select inputs by class
  let coeff_x_fonction_array = coeff_x_fonction_inputs();
  coeff_x_fonction_array = coeff_x_fonction_array.length;
  let constantes_contraintes_array = constantes_contraintes();
  constantes_contraintes_array = constantes_contraintes_array.length;
  let matrix  = [];

  rows_values = [];
    inputs.forEach(input => {
      rows_values.push(parseInt(input.value, 10)); // here
    });

  console.log(rows_values);
  var k = 0;

  for (let i = 0 ; i < constantes_contraintes_array ; i++) {
    
    let arr = [];
    for (var j = k ; j < k + coeff_x_fonction_array ; j++) {

      arr.push(rows_values[j])
    }
    matrix[i] = arr;
    k = j;
    
  }

  return matrix;
}

function constantes_contraintes() {
  const inputs = document.querySelectorAll('.constantes_contraintes'); // Select inputs by class
  const inputValues = [];

  inputs.forEach(input => {
    inputValues.push(parseInt(input.value, 10)); // here
  });

  return inputValues;
}

function print_coeff() {
  console.log(constantes_contraintes());
  console.log(coeff_x_contraintes_inputs());
  console.log(coeff_x_fonction_inputs());
  
}


function clean_home_page() {
  const contraintesContainer = document.getElementById('contraintesContainer');
  contraintesContainer.innerHTML = '';
  const inputContainer = document.getElementById('inputContainer');
  inputContainer.innerHTML = '';
  const article_text = document.getElementById('article_text');
  //article_text.innerHTML = '';
  article_text.remove();
  const nbr_variable_container = document.getElementById('nbr_variable_container');
  nbr_variable_container.innerHTML = '';
  const nbr_contraintes_container = document.getElementById('nbr_contraintes_container');
  nbr_contraintes_container.innerHTML = '';
  const button_simplex = document.getElementById('button_simplex');
  button_simplex.innerHTML = '';
  const guide_button = document.getElementById('guide_button')
  if(guide_button) {
    guide_button.remove();
  }
  

  var style = document.createElement('style');
  var css = 'body { margin: 0;padding: 0;display: flex;justify-content: center;align-items: center;min-height: 100vh; }';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

function clean_home() {
  const container_total = document.getElementById('container_total');
  container_total.innerHTML = '';
}

function show_guide() {
  const article_text = document.getElementById('article_text');
  const guide_button = document.getElementById('guide_button');
  article_text.innerHTML = 'User guide removed . Refresh the page to see it again !'
  guide_button.remove();

}

