// TodayTasks.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import COLORS, { GradientColors } from '../../config/colors';

const TaskItem = ({ icon, title, subtitle, onPress, iconGradient }) => {

  return (
    <Animatable.View animation="slideInUp" duration={600} style={{ marginBottom: 12 }}>
      <TouchableOpacity 
        style={styles.taskItem} 
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Icon Container with Gradient */}
        <LinearGradient
          colors={iconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <Text style={styles.taskIcon}>{icon}</Text>
        </LinearGradient>

        {/* Content */}
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{title}</Text>
          <Text style={styles.taskSubtitle}>{subtitle}</Text>
        </View>

        {/* Chevron */}
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const TodayTasks = ({ tasks = [] }) => {
  // Get gradient icons based on task index
  const iconGradients = [
    GradientColors.blue,
    GradientColors.purplePink,
    GradientColors.green,
    GradientColors.orange,
  ];

  const defaultTasks = [
    {
      id: '1',
      icon: '📊',
      title: 'Take Grade Test',
      subtitle: 'Full syllabus practice',
    },
    {
      id: '2',
      icon: '📋',
      title: 'Take PYQ Test',
      subtitle: 'Past Year Papers',
    },
  ];

  const taskList = tasks.length > 0 ? tasks : defaultTasks;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Practice ⚡</Text>

      <View>
        {taskList.map((task, index) => (
          <TaskItem
            key={task.id}
            icon={task.icon}
            title={task.title}
            subtitle={task.subtitle}
            onPress={task.onPress || (() => {})}
            iconGradient={iconGradients[index % iconGradients.length]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 14,
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BG_PRIMARY,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    flexShrink: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  taskIcon: {
    fontSize: 24,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  taskSubtitle: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
  },
  arrowIcon: {
    fontSize: 24,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 8,
    flexShrink: 0,
  },
});

export default TodayTasks;
