import React, { useState } from "react";
import { Box, Flex, Button, VStack, HStack, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaArrowRight, FaPlus, FaMousePointer } from "react-icons/fa";

// A simple draggable node component
const DraggableNode = ({ title, onDragEnd }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setPosition({
      x: position.x + e.nativeEvent.offsetX,
      y: position.y + e.nativeEvent.offsetY,
    });
    onDragEnd && onDragEnd();
  };

  return (
    <Flex
      p={4}
      bg="teal.500"
      color="white"
      borderRadius="md"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      cursor="grab"
      userSelect="none"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Text>{title}</Text>
    </Flex>
  );
};

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nodes, setNodes] = useState([
    { id: 1, title: "AI Agent 1" },
    { id: 2, title: "AI Agent 2" },
  ]);

  const addNode = () => {
    const newNode = {
      id: nodes.length + 1,
      title: `AI Agent ${nodes.length + 1}`,
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <Box p={8}>
      <VStack spacing={4}>
        <HStack>
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNode}>
            Add Node
          </Button>
          <Button leftIcon={<FaMousePointer />} colorScheme="green" onClick={onOpen}>
            Connect Nodes
          </Button>
        </HStack>
        <Box position="relative" h="500px" w="full" bg="gray.100" borderRadius="md">
          {nodes.map((node) => (
            <DraggableNode key={node.id} title={node.title} />
          ))}
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Nodes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Select two nodes to create a connection.</Text>
            {/* Placeholder for future connection logic */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Connect</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
