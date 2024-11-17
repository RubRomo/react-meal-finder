import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Grid,
    GridItem,
    useDisclosure,
} from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { Fragment, useState } from "react";
import { Category, Meal, MealDetails, SearchForm } from "./types";
import useHttpData from "./hooks/useHttpData";
import axios from "axios";
import RecipeModal from "./components/RecipeModal";
import useFetch from "./hooks/useFetch";

const baseURL = "https://www.themealdb.com/api/json/v1/1/";

const url = `${baseURL}list.php?c=list`;

const makeMealUrl = (category: Category) => {
    return `${baseURL}filter.php?c=${category.strCategory}`;
};

const defaultCategory = {
    strCategory: "Beef",
};

function App() {
    //Variables and fn's from Chackra UI modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedCat, setSelectedCat] = useState<Category>(defaultCategory);

    const { loading, data } = useHttpData<Category>(url);

    const {
        loading: loadingMeal,
        data: dataMeal,
        setData: setMeals,
        setLoading: setLoadingMeal,
    } = useHttpData<Meal>(makeMealUrl(selectedCat));

    //Topbar search fn
    const searchMeal = (searchForm: SearchForm) => {
        const url = `${baseURL}search.php?s=${searchForm.search}`;
        setLoadingMeal(true);
        axios
            .get<{ meals: Meal[] }>(url)
            .then((response) => {
                return setMeals(response.data.meals);
            })
            .finally(() => setLoadingMeal(false));
    };

    //Custom hook for showing modal meal details
    const {
        fetch,
        loading: loadingMealModal,
        data: mealDetailData,
    } = useFetch<MealDetails>();

    const searchMealDetails = (meal: Meal) => {
        //onOpen = Shows modal
        onOpen();
        //https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
        fetch(`${baseURL}lookup.php?i=${meal.idMeal}`);
    };

    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure();

    return (
        <Fragment>
            <Grid
                //Defines two columns, header takes 2 cols
                templateAreas={`"header header"
                      "nav main"`}
                //Rows height
                gridTemplateRows={"60px 1fr"}
                //Sets the cols width, for small devices column #1 disapears (side-var)
                gridTemplateColumns={{ base: "0 1fr", md: "250px 1fr" }}
            >
                <GridItem
                    boxShadow="lg"
                    zIndex="1"
                    position="sticky"
                    top="0"
                    pt="7px"
                    bg="white"
                    area={"header"}
                >
                    <Header onSubmit={searchMeal} onOpen={onDrawerOpen} />
                </GridItem>
                <GridItem
                    position={{ base: "static", md: "sticky" }}
                    display={{ base: "none", md: "block" }}
                    top="50px"
                    left="0"
                    p="5"
                    area={"nav"}
                    height="calc(100vh - 100px)"
                    overflowY="auto"
                >
                    <SideNav
                        categories={data}
                        loading={loading}
                        selectedCategory={selectedCat}
                        setCategory={setSelectedCat}
                    />
                </GridItem>
                <GridItem p="2" bg="gray.100" area={"main"}>
                    <MainContent
                        loading={loadingMeal}
                        meals={dataMeal}
                        openRecipe={searchMealDetails}
                    />
                </GridItem>
            </Grid>
            <RecipeModal
                isOpen={isOpen}
                onClose={onClose}
                loading={loadingMealModal}
                data={mealDetailData}
            />

            <Drawer
                isOpen={isDrawerOpen}
                placement="left"
                onClose={onDrawerClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Categories</DrawerHeader>
                    <DrawerBody>
                        <SideNav
                            categories={data}
                            loading={loading}
                            selectedCategory={selectedCat}
                            setCategory={(category) => {
                                setSelectedCat(category);
                                onDrawerClose();
                            }}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Fragment>
    );
}

export default App;
