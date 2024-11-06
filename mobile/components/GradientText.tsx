import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientText({children}) {
    return (
        <MaskedView
            maskElement={<Text style={{
                fontSize: 24,
                fontFamily: 'Playwrite GB S',
                lineHeight: 1.8
            }}>{children}</Text>}>
            <LinearGradient
                colors={['#8e2de2', '#f64f59', '#4facfe', '#f093fb']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{flex: 1}}
            />
        </MaskedView>
    );
}
