import { Logo } from '../components/primitives/Logo/Logo';
import { Text } from '../components/primitives/Text/Text';
import { Box } from '../components/primitives/Box/Box';
import { Flex } from '../components/primitives/Flex/Flex';
import { getSystemResource } from '../utils/getSystemResorce';
import { useConfig } from '../hooks/useConfig';

const HomePage = () => {
    const config = useConfig();

    if (!config) return <></>;

    return (
        <Flex minHeight="100svh" direction="column" alignItems="center" justifyContent="center">
            <Box width="450px" bordered rounded="large" padding={8}>
                <Box width="80px" height="80px" marginLeft="auto" marginRight="auto">
                    <Logo />
                </Box>
                <Text
                    size="xxl"
                    label={getSystemResource('side.banner.title', config.language)}
                    color="black"
                    textAlign="center"
                    marginTop={6}
                />
            </Box>
        </Flex>
    );
};

export { HomePage };
