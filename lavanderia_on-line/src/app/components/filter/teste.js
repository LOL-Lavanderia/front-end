import React, { useState } from 'react';
import { TextInput, ScrollView, View, Text, StyleSheet } from 'react-native';

const App = () => {
	const [text, setText] = useState('');
	const data = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

	return (
		<View style={styles.container}>
			{/* Exemplo TextInput */}
			<TextInput
				style={styles.input}
				placeholder="Digite seu nome"
				value={text}
				onChangeText={setText}
			/>

			{/* Exemplo ScrollView */}
			<ScrollView style={styles.scrollView}>
				{data.map((item, index) => (
					<Text key={index} style={styles.item}>
						{item}
					</Text>
				))}
			</ScrollView>

			{/* Exemplo View */}
			<View style={styles.box}></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 40,
		width: 200,
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	scrollView: {
		maxHeight: 200,
		marginBottom: 20,
	},
	item: {
		padding: 10,
		fontSize: 18,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	box: {
		width: 100,
		height: 100,
		backgroundColor: 'blue',
	},
});

export default App;
