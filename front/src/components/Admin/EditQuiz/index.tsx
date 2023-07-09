import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Quiz } from '../../../types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const EditQuiz = () => {
  const location = useLocation();
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    setEditQuiz(location.state.quiz);
  }, []);

  return (
    <>
      {editQuiz !== null && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          width="100%"
          minHeight="100vh"
          sx={{ backgroundColor: 'red' }}
        >
          <Card
            raised
            sx={{
              width: '70%',
              minHeight: '80vh',
              maxWidth: '600px',
              p: 2,
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <CardHeader title="問題作成" pb="0px" />
              <Button>
                <Link to="/admin/quizList">戻る</Link>
              </Button>
            </Stack>

            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Stack direction="column" spacing={2}>
                  <TextField
                    label="クイズタイトル"
                    variant="outlined"
                    fullWidth
                    multiline
                    maxRows={2}
                    // onChange={(e) => handleTitleChange(e)}
                    // value={quizContent}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="baseline"
                  justifyContent="center"
                  px="10px"
                  pb="5px"
                >
                  <TextField
                    label="選択肢"
                    variant="standard"
                    fullWidth
                    // value={choice}
                    inputProps={{
                      maxLength: 13,
                    }}
                    // onChange={(e) => handleChange(e)}
                  />
                </Stack>
              </Grid>
              <Grid container ml="20px" mt="10px" spacing={1}>
                <Typography color="text.secondary" variant="caption" ml="10px">
                  選択したものが答えになります
                </Typography>
                {/* {choiceList.map((_choice, id) => ( */}
                {/* <Grid item xs={12} key={id}> */}
                <Stack direction="row" alignItems="center">
                  <Radio
                  // value={MARK[id]}
                  // checked={selectRadio === MARK[id]}
                  // onChange={(e) => handleChangeRadioButton(e)}
                  />
                  {/* <Box>{MARK[id]}.</Box>
                <Box ml="5px">{choiceList[id]}</Box> */}
                </Stack>
              </Grid>
              {/* ))} */}
              {/* </Grid> */}

              <CardActions>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={3}
                  mt="10px"
                >
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: '110px' }}
                    // disabled={choiceList.length < 2 || selectRadio === null}
                    // onClick={() => createQuiz()}
                  >
                    編集完了
                  </Button>
                </Stack>
              </CardActions>
            </Grid>
          </Card>
        </Stack>
      )}
    </>
  );
};

export default EditQuiz;
