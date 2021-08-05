import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Delete } from '@material-ui/icons';

const styles = theme => ({ // ?
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
});

const databaseURL = "https://wordcloud-aa739-default-rtdb.firebaseio.com";


class Words extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            words: {},
            dialog: false,
            word: '',
            weight: ''
        };
    }
    // REST API / CRUD
    _get() {
        fetch(`${databaseURL}/words.json`).then(res => {
            if (res.status != 200) {
                throw new ErrorEvent(res.statusText);
            }
            return res.json();
        }).then(words => this.setState({ words: words }));
    }
    _post(word) { // data insert
        return fetch(`${databaseURL}/words.json`, {
            method: 'POST',
            body: JSON.stringify(word) // javascript object -> JSON object
        }).then(res => {
            if (res.status != 200) {
                throw new ErrorEvent(res.statusText);
            }
            return res.json();
        }).then(data => { // 화면의 정보를 모두 보여주는 것이 아닌 등록요청한 그 단어 정보만 화면에 '추가로' 보여준다
            let nextState = this.state.words; // array assign => deep? shallow? 일부러 이렇게 추가한 이유가 있을 것...
            nextState[data.name] = word;
            this.setState({ words: nextState });
        });
    }
    _delete(id) {
        return fetch(`${databaseURL}/words/${id}.json`, {
            method: 'Delete'
        }).then(res => {
            if (res.status != 200) {
                throw new ErrorEvent(res.statusText);
            }
            return res.json();
        }).then(() => {
            let nextState = this.state.words;
            delete nextState[id];
            this.setState({ words: nextState });
        });
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.words != this.state.words; // component update when state data(words) change 
    // }

    handleDialogToggle = () => this.setState({ dialog: !this.state.dialog });

    handleValueChange = (e) => { // 화면에 입력한 내용을 출력
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSubmit = () => {
        const word = {
            word: this.state.word,
            weight: this.state.weight
        }
        this.handleDialogToggle();
        if (!word.word && !word.weight) {
            return;
        }
        this._post(word);
    }
    handleDelete = (id) => {
        this._delete(id);
    }

    componentDidMount() { // after render()
        this._get();
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                {Object.keys(this.state.words).map(id => {
                    const word = this.state.words[id];
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        가중치: {word.weight}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                                {word.word}
                                                </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="contained" color="primary" onClick={() => this.handleDelete(id)}>삭제</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <AddIcon />
                </Fab>
                <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
                    <DialogTitle>단어 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="단어" type="text" name="word" value={this.state.word} onChange={this.handleValueChange} /><br />
                        <TextField label="가중치" type="text" name="weight" value={this.state.weight} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>    
        );
    }
}

export default withStyles(styles)(Words);

// 중간의 내용을 삭제하면 발생하는 에러 => Cannot read property 'weight' of null