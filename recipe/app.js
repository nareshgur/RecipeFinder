document.getElementById('searchButton').addEventListener('click',searchRecipes);

function searchRecipes(){
    const searchTerm = document.getElementById('searchInput').value.trim();

    if(searchTerm!==''){
         fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => data = response.json())
        .then(data=> {
            displayRecipes(data.meals)
        })
        .catch(error=> console.log("Error in fetching data:", error));
    }else{
        clearResult();
    }

    function displayRecipes(recipes){
        const resultList = document.getElementById('results');
        resultList.innerHTML = '';
        if(recipes){
            recipes.forEach(recipe => {
                const li = document.createElement("li");
                li.classList.add('recipe');


                const img = document.createElement('img')
                img.src = recipe.strMealThumb
                img.alt = recipe.strMeal;

                const title = document.createElement('h3')
                title.textContent = recipe.strMeal

                const recipeDetails = document.createElement('p')
                recipeDetails.textContent = recipe.strInstructions;

                const mess= document.createElement('p')
                mess.textContent = "The following are the ingredients";


                const ingredientsList = document.createElement('ul');
            ingredientsList.classList.add('ingredients');

            // Iterate over ingredients and measures
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe['strIngredient' + i];
                const measure = recipe['strMeasure' + i];

                // Stop iteration if ingredient is empty
                if (!ingredient) break;

                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = `${measure} - ${ingredient}`;
                ingredientsList.appendChild(ingredientItem);
            }
            

                li.appendChild(img)
                li.appendChild(title)
                li.appendChild(recipeDetails)
                li.appendChild(mess);
                li.appendChild(ingredientsList);
                resultList.appendChild(li);

            });
        }else{
            const li = document.createElement('li');
            li.textContent = 'No recipes found'
            resultList.appendChild(li)
        }
    }
}

function clearResult(){
    document.getElementById('result').innerHTML='';
}