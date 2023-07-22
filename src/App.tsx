/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomIcon from './components/CustomIcon';
import {boardType, boardValue, customIconType} from './types';

const valueToIconMap: {[key: string]: customIconType} = {
  U: 'pencil',
  O: 'circle',
  X: 'cross',
};

const firstDiagonal = new Set([0, 4, 8]);
const secondDiagonal = new Set([2, 4, 6]);

function App(): JSX.Element {
  // Initial Values
  const initialBoardState: boardType = [
    'U',
    'U',
    'U',
    'U',
    'U',
    'U',
    'U',
    'U',
    'U',
  ];

  // States
  const [player, setPlayer] = useState<'O' | 'X'>('O');
  const [board, setBoard] = useState<boardType>([...initialBoardState]);
  const [winner, setWinner] = useState<boardValue>('U');

  // Handlers
  const onTurnHandler = (buttonInd: number): void => {
    if (board[buttonInd] !== 'U') {
      return;
    }
    board[buttonInd] = board[buttonInd] === 'O' ? 'X' : 'O';

    let doesWon = false;
    const multiplier = Math.floor(buttonInd / 3) * 3;
    if (
      (player === board[(buttonInd + 3) % 9] &&
        player === board[(buttonInd + 6) % 9]) ||
      (player === board[((buttonInd + 1) % 3) + multiplier] &&
        player === board[((buttonInd + 2) % 3) + multiplier])
    ) {
      doesWon = true;
    }
    if (firstDiagonal.has(buttonInd) && !doesWon) {
      if (
        player === board[(buttonInd + 3) % 9] &&
        player === board[(buttonInd + 6) % 9]
      ) {
        doesWon = true;
      }
    }

    if (doesWon) {
      setWinner(player);
    }

    setBoard(prevBoard => {
      prevBoard[buttonInd] = player;
      return prevBoard;
    });
    setPlayer(prevPlayer => (prevPlayer === 'O' ? 'X' : 'O'));
  };

  const onResetHandler = () => {
    setPlayer('O');
    setBoard([...initialBoardState]);
    setWinner('U');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Tic Tac Toe</Text>
        </View>
        <View style={styles.turnContainer}>
          <Text style={styles.turnText}>Player {player}'s Turn</Text>
        </View>
        <View style={styles.playArea}>
          {board.map((value, ind) => (
            <Pressable
              key={ind}
              style={styles.playAreaBtn}
              onPress={() => onTurnHandler(ind)}>
              <CustomIcon type={valueToIconMap[value]} />
            </Pressable>
          ))}
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={onResetHandler}>
          <Text style={styles.resetBtnText}>
            {winner === 'U' ? 'Reload the game' : 'Start New Game'}
          </Text>
        </TouchableOpacity>
        {winner !== 'U' ? (
          <View style={styles.resultArea}>
            <Text style={styles.resultAreaTxt}>Player {winner} won!!</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  headingContainer: {
    padding: 10,
    backgroundColor: Colors.darker,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  headingText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  turnContainer: {
    backgroundColor: '#f7c845',
    padding: 10,
    margin: 10,
    borderRadius: 6,
  },
  turnText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playArea: {
    marginHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
    height: 300,
    flexWrap: 'wrap',
  },
  playAreaBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    height: '33%',
  },
  resetBtn: {
    backgroundColor: '#8D3DAF',
    margin: 30,
    padding: 8,
    borderRadius: 8,
  },
  resetBtnText: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  resultArea: {
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#515151',
  },
  resultAreaTxt: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default App;
