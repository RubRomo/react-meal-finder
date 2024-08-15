import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from "@chakra-ui/react";
import RecipeModalSkeleton from "./RecipeModalSkeleton";
import { MealDetails } from "../types";
import RecipeModalContent from "./RecipeModalContent";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
    data: MealDetails | undefined;
};

const RecipesModal = ({ isOpen, onClose, loading, data }: Props) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    {loading ? (
                        <RecipeModalSkeleton />
                    ) : (
                        data && <RecipeModalContent data={data} />
                    )}
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RecipesModal;
