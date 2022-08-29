import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemWrapper}>
                {/* Left Side */}
                <View style={styles.leftWrapper}>
                    <Image source={{ url: logoUrl }} style={styles.image} />
                    <View style={styles.titlesWrapper}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
                    </View>
                </View>

                {/* Right Side */}
                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
                    <Text style={[styles.subtitle, { color: priceChangePercentage7d < 0 ? '#FF3B30' : '#34C759' }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titlesWrapper: {
        marginLeft: 8
    },
    title: {
        fontSize: 18
    },
    image: {
        height: 48,
        width: 48
    },
    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: '#A9ABB1'
    },
    rightWrapper: {
        alignItems: 'flex-end'
    }
})

export default ListItem

