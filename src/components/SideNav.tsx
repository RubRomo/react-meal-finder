import { Category } from "../types";
import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";

type Props = {
    categories: Category[];
    loading: boolean;
    selectedCategory: Category;
    setCategory: (category: Category) => void;
};

//Styles for def category
const selectedProps = {
    bgColor: "blue.400",
    color: "white",
    fontWeight: "bold",
};

const SideNav = ({
    loading,
    categories,
    selectedCategory,
    setCategory,
}: Props) => {
    return loading ? (
        <SkeletonText mt="4" noOfLines={10} spacing="6" skeletonHeight="2" />
    ) : (
        <>
            <Heading color="blue.200" fontSize={12} fontWeight="bold" mb={4}>
                CATEGORIES
            </Heading>
            <VStack align="stretch">
                {categories.map((c) => {
                    return (
                        <Link
                            px={2}
                            py={1}
                            borderRadius={5}
                            _hover={{ textDecoration: "none" }}
                            {...(selectedCategory.strCategory ==
                                c.strCategory && selectedProps)}
                            key={c.strCategory}
                            fontSize={14}
                            onClick={() => {
                                //console.log(c);
                                return setCategory(c);
                            }}
                        >
                            {c.strCategory}
                        </Link>
                    );
                })}
            </VStack>
        </>
    );
};

export default SideNav;
