export type Category = {
    strCategory: string;
};

export type CategoriesResponse = {
    meals: Category[];
};

export type Meal = {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
};

//Tobar
export type SearchForm = {
    search: string;
};

//dynamic object type
export type MealDetails = {
    //All the properties are going to be taken as string
    [key: string]: string;
};
