import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

interface Props {
    pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props ) => {

    return (
        <ScrollView
            style={{
                ...StyleSheet.absoluteFillObject,
                marginTop: 370
            }}
        >
            <View style={{
                ...styles.container
            }}>
                <Text style={ styles.title }>Types</Text>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});