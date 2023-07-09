import React from 'react'

const EditQuiz = () => {
  return (
    <div>EditQuiz</div>
  )
}

export default EditQuiz
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardHeader,
//   Grid,
//   Radio,
//   Stack,
//   TextField,
//   Typography,
// } from '@mui/material';

// type Mark = 'A' | 'B' | 'C' | 'D' | 'E';

// type getQuiz = {
//   id: number;
//   content: string;
//   correct_mark: string;
//   is_ancer_opened: boolean;
//   created_at: Date;
//   updated_at: Date;
// };

// type getChoice = {
//   id: number;
//   quiz_id: number;
//   mark: Mark;
//   content: string;
//   created_at: Date;
//   updated_at: Date;
// };

// type jsonQuiz = {
//   quiz: getQuiz;
//   choices: getChoice[];
// };

// const EditQuiz = () => {
//   const { id } = useParams();
//   const [editQuizContent, setEditQuizContent] = useState<string>('');
//   const [editChoiceList, setEditChoiceList] = useState<getChoice[]>([]);
//   const MARK: Mark[] = ['A', 'B', 'C', 'D', 'E'];
//   const [choice, setchoice] = useState<string>('');
//   const [selectRadio, setSelectRadio] = useState<string | null>(null);

//   useEffect(() => {
//     getEditQuiz();
//   }, []);
//   const getEditQuiz = async () => {
//     const res = await fetch(`http://localhost:3001/quizzes/${id}`);
//     const json: jsonQuiz = await res.json();
//     setEditQuizContent(json.quiz.content);
//     setEditChoiceList(json.choices);
//     console.log(json);
//   };

//   const handleTitleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setEditQuizContent(e.target.value);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     if (choice.length === 13) return;
//     setchoice(e.target.value);
//   };

//   const handleChangeRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectRadio(e.target.value);
//   };

//   const addChoice = () => {};

//   const updateQuiz = () => {};

//   const deleteChoice = () => {};

//   return (
//     <>
//       {editChoiceList.length === 0 ? (
//         <Stack
//           direction="row"
//           justifyContent="center"
//           alignItems="center"
//           width={'100%'}
//           height={'100vh'}
//           fontSize={'40px'}
//         >
//           Loading...
//         </Stack>
//       ) : (
//         <Stack
//           direction="column"
//           justifyContent="center"
//           alignItems="center"
//           spacing={3}
//           width="100%"
//           height="100vh"
//         >
//           <Card
//             raised
//             sx={{
//               width: '80%',
//               height: '80vh',
//               maxWidth: 450,
//               maxHeight: 650,
//               p: 2,
//             }}
//           >
//             <CardHeader title="問題作成" pb="0px" />
//             <Grid container justifyContent="center" spacing={2}>
//               <Grid item xs={12}>
//                 <Stack direction="column" spacing={2}>
//                   <TextField
//                     label="クイズタイトル"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     maxRows={2}
//                     onChange={(e) => handleTitleChange(e)}
//                     value={editQuizContent}
//                   />
//                 </Stack>
//               </Grid>
//               <Grid item xs={12}>
//                 <Stack
//                   direction="row"
//                   alignItems="baseline"
//                   justifyContent="center"
//                   px="10px"
//                   pb="5px"
//                 >
//                   <TextField
//                     label="選択肢"
//                     variant="standard"
//                     fullWidth
//                     value={choice}
//                     inputProps={{
//                       maxLength: 13,
//                     }}
//                     onChange={(e) => handleChange(e)}
//                   />
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => addChoice()}
//                     disabled={
//                       (editChoiceList.length >= 5 && true) ||
//                       choice.length === 0
//                     }
//                     sx={{ marginLeft: '10px' }}
//                   >
//                     追加
//                   </Button>
//                 </Stack>
//               </Grid>
//               <Grid container ml="20px" mt="10px" spacing={1}>
//                 <Typography color="text.secondary" variant="caption" ml="10px">
//                   選択したものが答えになります
//                 </Typography>
//                 {editChoiceList.map((_choice, id) => (
//                   <Grid item xs={12} key={id}>
//                     <Stack direction="row" alignItems="center">
//                       <Radio
//                         value={MARK[id]}
//                         checked={selectRadio === MARK[id]}
//                         onChange={(e) => handleChangeRadioButton(e)}
//                       />
//                       <Box>{MARK[id]}.</Box>
//                       <Box ml="5px">{editChoiceList[id].content}</Box>
//                     </Stack>
//                   </Grid>
//                 ))}
//               </Grid>

//               <CardActions>
//                 <Stack
//                   direction="row"
//                   alignItems="center"
//                   spacing={3}
//                   mt="10px"
//                 >
//                   <Button
//                     variant="contained"
//                     size="medium"
//                     sx={{ width: '110px' }}
//                     disabled={editChoiceList.length < 2 || selectRadio === null}
//                     onClick={() => updateQuiz()}
//                   >
//                     問題登録
//                   </Button>
//                   <Button
//                     variant="contained"
//                     size="medium"
//                     color="warning"
//                     sx={{ width: '110px' }}
//                     disabled={editChoiceList.length === 0}
//                     onClick={() => deleteChoice()}
//                   >
//                     削除
//                   </Button>
//                 </Stack>
//               </CardActions>
//             </Grid>
//           </Card>
//           <Box>
//             <Link to="/admin">戻る</Link>
//           </Box>
//         </Stack>
//       )}
//     </>
//   );
// };

// export default EditQuiz;
