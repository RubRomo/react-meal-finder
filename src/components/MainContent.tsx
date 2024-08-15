import { Meal } from "../types";
import { SimpleGrid } from "@chakra-ui/react";
import MealCard from "./MealCard";
import SkeletonCard from "./SkeletonCard";

type Props = {
    loading: boolean;
    meals: Meal[];
    openRecipe: (meal: Meal) => void;
};

const MainContent = ({ loading, meals, openRecipe }: Props) => {
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        //Passing `columns={[2, null, 3]}` is equals to base: 2 columns, md: 3 columns
        <SimpleGrid columns={[2, null, 3, 4]} spacing="20px">
            {loading && skeletons.map((s) => <SkeletonCard key={s} />)}
            {!loading &&
                meals.map((m) => {
                    return (
                        <MealCard
                            openRecipe={() => openRecipe(m)}
                            key={m.idMeal}
                            meal={m}
                        />
                    );
                })}
        </SimpleGrid>
    );
};

export default MainContent;
