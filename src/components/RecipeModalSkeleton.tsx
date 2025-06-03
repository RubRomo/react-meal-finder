import { Container, SkeletonText } from "@chakra-ui/react";

const RecipeModalSkeleton = () => {
    return (
        <Container>
            <SkeletonText
                mt="4"
                mb="4"
                spacing="4"
                noOfLines={1}
                skeletonHeight={8}
            />
            <SkeletonText spacing="4" noOfLines={1} skeletonHeight={280} />
            <SkeletonText mt="4" spacing="4" noOfLines={3} />
        </Container>
    );
};

export default RecipeModalSkeleton;
