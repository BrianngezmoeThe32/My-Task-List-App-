import React, { useState } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,FlatList,Alert} from 'react-native';
import { SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

const addTask = () => {
    const trimmedText = taskText.trim();

    if(!trimmedText){
        Alert.alert("Empty task","enter a task");
        return;
    }
    const newTask = {
        id:Date.now().toString(),
        text:trimmedText,
        done:false,
       
    }
    setTasks([...tasks,newTask])
    setTaskText("");
}
const toggleTask = (id) => {
  setTasks(tasks.map(task =>
    task.id === id 
      ? { ...task, done: !task.done }
      : task 
  ));
};
const deleteTask = (id) => {
  setTasks(tasks.filter(task => task.id !== id));
};
const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        onPress={() => toggleTask(item.id)}
        style={styles.checkboxContainer}
      >
        <Text style={styles.checkbox}>
          {item.done ? '✅' : '⬜'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.taskTextContainer}
        onPress={() => toggleTask(item.id)}
      >
        <Text style={[
          styles.taskText,
          item.done && styles.taskTextDone
        ]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
);
    return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          <Text style={styles.title}> My Task List</Text>
          <Text style={styles.subtitle}>
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </Text>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new task..."
            placeholderTextColor="#999"
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addTask}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={renderTaskItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}></Text>
              <Text style={styles.emptyText}>No Task Yet</Text>
              <Text style={styles.emptySubtext}>Add a task above to get started</Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: '#F8F9FA',
 },

 keyboardAvoidView: {
 flex: 1,
 },

 header: {
 paddingHorizontal: 20,
 paddingTop: 20,
 paddingBottom: 15,
 backgroundColor: '#FFFFFF',
 borderBottomWidth: 1,
 borderBottomColor: '#E9ECEF',
 },

 title: {
 fontSize: 28,
 fontWeight: 'bold',
 color: '#212529',
 marginBottom: 4,
 },

 subtitle: {
 fontSize: 14,
 color: '#6C757D',
 },

 inputContainer: {
 flexDirection: 'row',
 padding: 15,
 backgroundColor: '#FFFFFF',
 borderBottomWidth: 1,
 borderBottomColor: '#E9ECEF',
 },

 input: {
 flex: 1,
 borderColor: '#DEE2E6',
 borderWidth: 1,
 borderRadius: 10,
 padding: 12,
 backgroundColor: '#F8F9FA',
 fontSize: 16,
 color: '#212529',
 },

 addButton: {
 backgroundColor: '#007AFF',
 paddingHorizontal: 24,
 paddingVertical: 12,
 borderRadius: 10,
 marginLeft: 10,
 justifyContent: 'center',
 alignItems: 'center',
 },

 addButtonText: {
 color: '#FFFFFF',
 fontSize: 16,
 fontWeight: '600',
 },

 listContainer: {
 padding: 15,
 flexGrow: 1,
 },

 taskItem: {
 flexDirection: 'row',
 alignItems: 'center',
 backgroundColor: '#FFFFFF',
 padding: 16,
 borderRadius: 12,
 marginBottom: 10,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.1,
 shadowRadius: 3,
 elevation: 3,
 },

 checkboxContainer: {
 marginRight: 12,
 },

 checkbox: {
 fontSize: 28,
 color: '#007AFF',
 },

 taskTextContainer: {
 flex: 1,
 },

 taskText: {
 fontSize: 16,
 color: '#212529',
 lineHeight: 22,
 },

 taskTextDone: {
 textDecorationLine: 'line-through',
 color: '#ADB5BD',
 },

 deleteButton: {
 padding: 8,
 marginLeft: 8,
 },

 deleteButtonText: {
 fontSize: 22,
 },

 emptyContainer: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 paddingVertical: 80,
 },

 emptyIcon: {
 fontSize: 64,
 marginBottom: 16,
  },

 emptyText: {
 fontSize: 20,
 fontWeight: '600',
 color: '#6C757D',
 marginBottom: 8,
 },

 emptySubtext: {
 fontSize: 14,
 color: '#ADB5BD',
 },
});