import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, topic, text });
    setTitle('');
    setTopic('');
    setText('');
  };

  return (
    <div>
      <h2>Add A New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default PostForm;





// ChakuraUI
// import React, { useState } from 'react';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from '@chakra-ui/react'

// const PostForm = ({ onSubmit }) => {
//   const [title, setTitle] = useState('');
//   const [topic, setTopic] = useState('');
//   const [text, setText] = useState('');
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ title, topic, text });
//     setTitle('');
//     setTopic('');
//     setText('');
//     onClose(); // Close the modal after submission
//   };

//   return (
//     <>
//       <Button onClick={onOpen}>Add A New Post</Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add A New Post</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="title">Title:</label>
//                 <input
//                   type="text"
//                   id="title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="topic">Topic:</label>
//                 <input
//                   type="text"
//                   id="topic"
//                   value={topic}
//                   onChange={(e) => setTopic(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="text">Text:</label>
//                 <textarea
//                   id="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   required
//                 ></textarea>
//               </div>
//               <Button type="submit">Submit Post</Button>
//             </form>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default PostForm;

