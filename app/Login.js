import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import colors from '../config/colors';
import Animated, { Easing, Extrapolate } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');
const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, concat } = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };
  
    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };
  
    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
  }

class Login extends Component {
  
  constructor() {
        super();

        this.buttonOpacity = new Value(1);

        this.onStateChange = event([
            {
              nativeEvent: ({ state }) =>
                block([
                  cond(
                    eq(state, State.END),
                    set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                  )
                ])
            }
        ]);

        this.onCloseState = event([
            {
              nativeEvent: ({ state }) =>
                block([
                  cond(
                    eq(state, State.END),
                    set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                  )
                ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP

        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 4 * 3, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });
    }

    onPress = () => {
        Keyboard.dismiss();
        console.log("Password entered !");
    };

    render() {
        return (
            <View style={styles.container}>

                {/* Logo */}
                <Animated.View style={{ ...StyleSheet.absoluteFill, transform:[{ translateY:this.bgY }] }}>
                    <Image
                        style={{flex: 1, height: height, width: width}}
                        source={require('../assets/background.png')}
                    />
                </Animated.View>

                {/* Buttons */}
                <Animated.View style={styles.movingInterface}>

                    {/* Buttons */}
                    <Animated.View style={{ ...styles.buttons, opacity: this.buttonOpacity }}>
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View 
                                style={{ 
                                    ...styles.signInButton, 
                                    opacity: this.buttonOpacity, 
                                    transform:[{ translateY: this.buttonY }] }
                                }>
                                <Text style={styles.signInText}>SE CONNECTER</Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View 
                                style={{ 
                                    ...styles.signUpButton, 
                                    opacity: this.buttonOpacity, 
                                    transform:[{ translateY: this.buttonY }] }
                                }>
                                <Text style={styles.signUpText}>CRÉER UN COMPTE</Text>
                            </Animated.View>
                        </TapGestureHandler>
                    </Animated.View>

                    {/* User's list and password input */}
                    <Animated.View style={{ 
                        ...styles.signInInterface, 
                        zIndex: this.textInputZindex, 
                        opacity: this.textInputOpacity, 
                        transform: [{ translateY: this.textInputY }]
                    }}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text style={{ ...styles.closeButtonText, transform:[{ rotate: concat(this.rotateCross, 'deg') }] }}>X</Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <Animated.View style={styles.logs}>
                            <TextInput
                                placeholder="Entrer le mot de passe"
                                style={styles.passwordInput}
                            />
                            <TouchableOpacity
                                style={styles.validButton}
                                onPress={this.onPress}
                            >
                                <Image source={require('../assets/validButton.png')} style={{ width: 25, height: 25 }}/>
                            </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    movingInterface: {
        height: height / 4 * 3,
        width: width,
        justifyContent: 'flex-end',
    },
    signInInterface: {
        ...StyleSheet.absoluteFill,
        top: null,
        height: height / 4 * 3,
        justifyContent: 'flex-end',
    },
    signUpInterface: {
        height: height / 4 * 3,
        justifyContent: 'flex-end',
    },
    buttons: {
        backgroundColor: colors.gray,
    },
    signInButton: {
        backgroundColor: colors.blue3,
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    signInText: {
        fontSize: 24,
        color: colors.white,
    },
    signUpButton: {
        backgroundColor: colors.white,
        height: 70,
        marginHorizontal: 20,
        marginVertical: 30,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    signUpText: {
        fontSize: 24,
    },
    logs: {
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        flexDirection: 'row',
        marginVertical: 30,
        height: height / 4 * 3,
    },
    passwordInput: {
        height: 50,
        width: width - 60,
        borderRadius: 25,
        paddingLeft: 20,
        backgroundColor: colors.white,

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    validButton: {
        width: 50,
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    closeButtonText: {
        fontSize: 15,
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: colors.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,

        shadowColor: colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        elevation: 3,
    },
})
