import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Front from '../images/bg-card-front.png';
import Back from '../images/bg-card-back.png';

export const FormDetails = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const navigate = useNavigate();
    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 16); // Remove non-numeric characters and limit to 16 digits
        const cardNumberWithSpaces = input
            .replace(/(\d{4})/g, '$1 ')
            .trim()
            .substring(0, 19); // Add spaces after every 4 digits
        setCardNumber(cardNumberWithSpaces, e.target.value);
    };
    const handleCardNameChange = (e) => {
        setCardName(e.target.value);
    };

    const handleExpiryMonthChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 2); // Only allow numeric characters and limit to 2 digits
        setExpiryMonth(input);
    };

    const handleExpiryYearChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 2); // Only allow numeric characters and limit to 2 digits
        setExpiryYear(input);
    };

    const handleCvvChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 3); // Remove non-numeric characters and limit to 3 digits
        setCvv(input);
        setCvv(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const cardDetails = {
            cardNumber,
            cardName,
            expiryMonth,
            expiryYear,
            cvv,
        };

        // Redirect to a new route while passing card details as state
        navigate('/thank-you', { state: { cardDetails } });
    };
    return (
        <Box >
            <Flex display={{ base: 'grid', md: 'flex' }} height={'100vh'} justifyContent={'center'} alignItems={'center'} gap={{ md: '6vw', lg: '10vw' }}>
                <Flex display={{ base: 'block', md: 'flex' }} flexDir={'column'} gap={{ md: 5, lg: 9 }} maxW={700} w={{ base: 250, sm: 300, md: 320, lg: 380 }}>
                    
                    {/* front */}
                    <Box position="relative" top={{ base: '98', md: 'auto' }} boxShadow={'14px 6px 20px 0px hsl(279deg 6% 55% / 27%)'} height={{ base: '25vh', sm: "27vh", md: '31vh', lg: '32vh' }} right={{ base: '0', md: '6vw' }} borderRadius="10px" zIndex={20} overflow={'hidden'}>
                        <Image src={`${Front}`} w="100%" position="absolute" height={{ base: '25vh', sm: '27vh', md: "auto" }} zIndex="-1" />
                        <Box position="relative" p={6} color="white" fontFamily={'Space Grotesk'}>
                            <Flex justifyContent='space-evenly' flexDirection={'column'} gap={{ base: '9vw', sm: '5vw', lg: '3.5vw' }}>
                                <Flex alignItems={'center'} gap={2.5}>
                                    <Box backgroundColor="white" p={{ base: 3, sm: 4, lg: 5 }} borderRadius="50%"></Box>
                                    <Box outline='0.1vw solid' w={{ base: 11, sm: 13, lg: 15 }} h={{ base: 11, sm: 13, lg: 15 }} outlineColor={'white'} borderRadius={50}></Box>
                                </Flex>
                                <Flex justifyContent="space-between" flexDir={'column'} gap={'1vw'}>
                                    <Text fontSize={{ base: '12px', sm: '16px', md: '18px', lg: '20px', '2xl': "20px" }} letterSpacing={3} fontWeight={500}>
                                        {cardNumber || '0000 0000 0000 0000'}
                                    </Text>
                                    <Flex justifyContent="space-between">
                                        <Text fontSize={{ base: 9, sm: 11, lg: 12 }} letterSpacing={1}>{cardName || 'Jane Appleseed'}</Text>
                                        <Flex>
                                            <Text fontSize={{ base: 9, sm: 11, lg: 12 }} letterSpacing={1}>{expiryMonth || '00'}/</Text>
                                            <Text fontSize={{ base: 9, sm: 11, lg: 12 }} letterSpacing={1}>{expiryYear || '00'}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Box>
                    </Box>

                    {/* Back */}
                    <Box boxShadow={'14px 6px 20px 0px hsl(279deg 6% 55% / 27%)'} position="relative" top={{ base: '-125px', sm: '-140px', md: 'auto' }} left={{ base: 50, md: 0 }} height={{ base: '25vh', sm: '27vh', md: "33vh" }} borderRadius="10px" zIndex={10} overflow={'hidden'}>
                        <Image src={`${Back}`} w="100%" h="100%" position="absolute" zIndex="-1" />
                        <Flex position="relative" fontFamily={'Space Grotesk'}
                            justifyContent={'end'} alignItems={'center'} right={{ base: '9vw', sm: '7vw', md: '5vw', lg: '4vw' }} height='-webkit-fill-available'>
                            <Text fontSize={10} fontWeight={500} letterSpacing={2}>
                                {cvv || '000'}
                            </Text>
                        </Flex>
                    </Box>
                </Flex >

                {/* Form */}
                <Box maxWidth={{ base: "300px", sm: '350px', md: "300px", lg: "350px", xl: "400px" }} position={{ base: 'relative' }} bottom={{ base: 30, md: 0 }} fontFamily={'Space Grotesk'} >
                    <form onSubmit={handleSubmit}>
                        <FormControl mt={{ base: 5, lg: 9 }} color={'hsl(278, 68%, 11%)'}>
                            <FormLabel htmlFor="cardName" textTransform={'uppercase'} fontSize={{ base: 10, sm: 12, md: 10, lg: 12 }} letterSpacing={2} fontWeight={500}>Cardholder Name</FormLabel>
                            <Input type="text"
                                id="cardName"
                                value={cardName}
                                onChange={handleCardNameChange}
                                placeholder="e.g. Jane Appleseed" boxShadow={'none'} variant='outline' borderColor="hsl(270, 3%, 87%)" _hover={{ borderColor: "#63b3ed" }} _placeholder={{ opacity: 1, color: 'gray.500', fontSize: { base: 14, lg: 16 } }}
                                required
                            />
                        </FormControl>
                        <FormControl mt={{ base: 5, lg: 9 }} color={'hsl(278, 68%, 11%)'}>
                            <FormLabel htmlFor="cardNumber" textTransform={'uppercase'} fontSize={{ base: 10, sm: 12, md: 10, lg: 12 }} letterSpacing={2} fontWeight={500}>Card Number</FormLabel>
                            <Input type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                id="cardNumber" placeholder="e.g. 1234 5678 9123 0000" boxShadow={'none'} variant='outline' _placeholder={{ opacity: 1, color: 'gray.500', fontSize: { base: 14, lg: 16 } }} borderColor="hsl(270, 3%, 87%)" _hover={{ borderColor: "#63b3ed" }}
                                required
                                maxLength={19}
                            />
                        </FormControl>
                        <Flex justifyContent="space-between" mt={{ base: 5, lg: 9 }}>
                            <FormControl flex="1" mr={2} color={'hsl(278, 68%, 11%)'}>
                                <FormLabel htmlFor="expiryDate" textTransform={'uppercase'} fontSize={{ base: 10, sm: 12, md: 10, lg: 12 }} letterSpacing={2} fontWeight={500}>Exp. Date (MM/YY)</FormLabel>
                                <Input
                                    value={expiryMonth}
                                    onChange={handleExpiryMonthChange}
                                    maxLength={2}
                                    type="text"
                                    id="expiryMonth"
                                    placeholder="MM"
                                    variant='outline'
                                    _placeholder={{ opacity: 1, color: 'gray.500', fontSize: { base: 14, lg: 16 } }}
                                    borderColor="hsl(270, 3%, 87%)"
                                    _hover={{ borderColor: "#63b3ed" }}
                                    w={{ base: '60px',xl:'70px'}}
                                    mr={'10px'}
                                    required
                                />
                                <Input
                                    value={expiryYear}
                                    onChange={handleExpiryYearChange}
                                    maxLength={2}
                                    type="text"
                                    id="expiryYear"
                                    placeholder="YY"
                                    variant='outline'
                                    _placeholder={{ opacity: 1, color: 'gray.500', fontSize: { base: 14, lg: 16 } }}
                                    borderColor="hsl(270, 3%, 87%)"
                                    _hover={{ borderColor: "#63b3ed" }}
                                    w={{ base: '60px',xl:'70px'}}
                                    required
                                />
                            </FormControl>
                            <FormControl flex="1" ml={2} color={'hsl(278, 68%, 11%)'}>
                                <FormLabel htmlFor="cvv" textTransform={'uppercase'} fontSize={{ base: 10, sm: 12, md: 10, lg: 12 }} letterSpacing={2} fontWeight={500}>CVc</FormLabel>
                                <Input type="text"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    maxLength={3}
                                    id="cvv" placeholder="e.g. 123" variant='outline' _placeholder={{ opacity: 1, color: 'gray.500', fontSize: { base: 14, lg: 16 } }} borderColor="hsl(270, 3%, 87%)" _hover={{ borderColor: "#63b3ed" }}
                                    required />
                            </FormControl>
                        </Flex>
                        <Button color={'hsl(0, 0%, 100%)'} py={{ md: 5, lg: 6 }} fontSize={{ md: 14, lg: 16 }} w={'-webkit-fill-available'} mt={{ base: 7, lg: 10 }} type="submit" _hover={{ bg: 'hsl(278, 68%, 11%)' }} bg={'hsl(278, 68%, 11%)'} fontWeight={500}>
                            Confirm
                        </Button>
                    </form>
                </Box >
            </Flex>
        </Box>
    )
}
