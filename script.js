// const state = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
const validTrack = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
                [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

const nextMove = {};

function checkWinning(state){
    let value;
    validTrack.forEach((track) => {
        if((state[track[0]] == state[track[1]]) && (state[track[1]] == state[track[2]])){
            value = state[track[0]];
            return;
        }
    });
    return value;
}

function flip(state){
    return state.map(val => {
        if(isNaN(val)) return NaN;
        return (val == 1 ? 0 : 1);
    });
}

function precompute(state, moveCount){
    if(checkWinning(state) === 1) return 1; // win
    if(checkWinning(state) === 0) return -1; // lose
    if(moveCount == 9) return 0;

    const nextState = flip(state);
    let bestCase = -1, bestMove = [];
    for(let i = 0; i < 9; i++){
        if(!isNaN(nextState[i])) continue;
        nextState[i] = 0;
        const result = precompute(nextState, moveCount + 1) * -1;
        nextState[i] = NaN;
        if(result > bestCase){
            bestMove = [];
            bestCase = result;
        }
        if(result == bestCase){
            bestMove.push(i);
        }
    }
    nextMove[state] = bestMove;
    return bestCase;
}

precompute([NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN], 0);