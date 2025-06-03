import {
    Button,
    Container,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoSearchSharp } from "react-icons/io5";
import { SearchForm } from "../types";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {
    onSubmit: (data: SearchForm) => void;
    onOpen: () => void;
};

const Header = ({ onSubmit, onOpen }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchForm>();
    return (
        <Container mt="0" maxWidth="3xl">
            <Flex alignItems="center">
                <IconButton
                    aria-label="Open Menu"
                    icon={<GiHamburgerMenu />}
                    display={{ base: "block", md: "none" }}
                    onClick={onOpen}
                    bg="none"
                />
                <form onSubmit={handleSubmit(onSubmit)} style={{ flexGrow: 1 }}>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <IoSearchSharp color="gray" />
                        </InputLeftElement>
                        <Input
                            mr="2"
                            {...register("search", { required: false })}
                            isInvalid={errors.search ? true : false}
                            focusBorderColor={
                                errors.search ? "crimson" : "blue.400"
                            }
                            type="text"
                            placeholder="Search by kerword..."
                        />
                        <Button type="submit" color="white" bgColor="blue.400">
                            Search
                        </Button>
                    </InputGroup>
                </form>
            </Flex>
        </Container>
    );
};

export default Header;
