import React, { useEffect, useState } from 'react'
import { View, Platform, Text, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';

import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;


export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

    const [ term, setTerm ] = useState('')

    useEffect(() => {
        
        if ( term.length === 0 ) {
            return setPokemonFiltered([]);
        }

        console.log(isNaN( Number(term) ))

        if ( isNaN( Number(term) ) ) {
            setPokemonFiltered(
                simplePokemonList.filter( 
                    (poke) => poke.name.toLocaleLowerCase()
                        .includes( term.toLocaleLowerCase() )
                )
            );
        } else {
            const pokemonById = simplePokemonList.find(poke => poke.id === term);
            setPokemonFiltered(
                ( pokemonById ) ? [pokemonById] : []
            );
        }




    }, [term])


    if ( isFetching ) {
        return <Loading />
    }  

    return (
        <View style={{ 
            flex: 1, 
            marginHorizontal: 20,
        }}>
            
            <SearchInput
                onDebounce={ (value) => setTerm( value )  }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: ( Platform.OS === 'ios' ) ? top : top + 30
                }}
            />


            <FlatList
                data={ pokemonFiltered }
                keyExtractor={ (pokemon) => pokemon.id }
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            paddingBottom: 10,
                            marginTop: ( Platform.OS === 'ios' ) ? top + 60 : top + 80
                        }}>{ term }</Text>
                    )}

                    renderItem={ ({ item }) => ( <PokemonCard pokemon={ item } /> )}
                />

        </View>
    )
}


