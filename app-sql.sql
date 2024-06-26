/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306_1
 Source Server Type    : MySQL
 Source Server Version : 50651 (5.6.51)
 Source Host           : localhost:3306
 Source Schema         : app-sql

 Target Server Type    : MySQL
 Target Server Version : 50651 (5.6.51)
 File Encoding         : 65001

 Date: 17/11/2022 14:39:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ev_days
-- ----------------------------
DROP TABLE IF EXISTS `ev_days`;
CREATE TABLE `ev_days`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `eid` int(11) NULL DEFAULT NULL COMMENT '更具日期展示每天数据',
  `pub_data` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '时间',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消费或者收入',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'icon文件',
  `mony` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '金额',
  `bei` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` int(1) NULL DEFAULT NULL COMMENT '1代表收入，0代表消费',
  `uid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `years` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '根据年查询',
  `month` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '按月查询',
  `days` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '按天查询',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 133 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ev_days
-- ----------------------------
INSERT INTO `ev_days` VALUES (123, 103, '2022年-11月-15日', '餐饮', NULL, '21', '12', 0, 20, '2022', '202211', '1115');
INSERT INTO `ev_days` VALUES (124, 103, '2022年-11月-15日', '交通', NULL, '21', '12', 1, 20, '2022', '202211', '1115');
INSERT INTO `ev_days` VALUES (125, 104, '2022年-11月-16日', '水果', NULL, '222', '222', 0, 20, '2022', '202211', '1116');
INSERT INTO `ev_days` VALUES (126, 104, '2022年-11月-16日', '蔬菜', NULL, '121', '121', 0, 20, '2022', '202211', '1116');
INSERT INTO `ev_days` VALUES (127, 105, '2022年-11月-14日', '交通', NULL, '121', '121', 0, 20, '2022', '202211', '1114');
INSERT INTO `ev_days` VALUES (128, 105, '2022年-11月-14日', '水果', NULL, '121', '12121', 0, 20, '2022', '202211', '1114');
INSERT INTO `ev_days` VALUES (129, 105, '2022年-11月-14日', '选择消费类型', NULL, '121', '21', 0, 20, '2022', '202211', '1114');
INSERT INTO `ev_days` VALUES (130, 105, '2022年-11月-14日', '水果', NULL, '12', '121', 0, 20, '2022', '202211', '1114');
INSERT INTO `ev_days` VALUES (131, 105, '2022年-11月-14日', '零食', NULL, '444', '无', 0, 20, '2022', '202211', '1114');
INSERT INTO `ev_days` VALUES (132, 104, '2022年-11月-16日', '无', NULL, '12', '12', 0, 20, '2022', '202211', '1116');

-- ----------------------------
-- Table structure for ev_times
-- ----------------------------
DROP TABLE IF EXISTS `ev_times`;
CREATE TABLE `ev_times`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '展示消费和收入列表',
  `eid` int(10) NULL DEFAULT NULL COMMENT '根据年年查询数据',
  `pub_data` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期',
  `alias` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 106 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ev_times
-- ----------------------------
INSERT INTO `ev_times` VALUES (103, 79, '11月-15日', '79');
INSERT INTO `ev_times` VALUES (104, 79, '11月-16日', '79');
INSERT INTO `ev_times` VALUES (105, 79, '11月-14日', '79');

-- ----------------------------
-- Table structure for ev_users
-- ----------------------------
DROP TABLE IF EXISTS `ev_users`;
CREATE TABLE `ev_users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `user_pic` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头像',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登陆状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ev_users
-- ----------------------------
INSERT INTO `ev_users` VALUES (20, 'root', '$2a$10$jxpBNYEix3YA2PkQS7AA5usK09O9RREWmOejqlfR2z4rF4gvWkJyK', 'goodkat', '1', 'http://tmp/U1FysQtT66Xe3c09db119e646d73fb90051bf87a25a0.PNG', '17782212571', '1');
INSERT INTO `ev_users` VALUES (21, 'root1', '$2a$10$x10fZ9B49O3oj1cQzcJqRehC4WWCuWSnh97YzamILlr.WrfKsYQ56', NULL, NULL, '', NULL, NULL);
INSERT INTO `ev_users` VALUES (22, '1', '$2a$10$bzErcOfkr6Cr7WkXwZoW/.ATvzo47pxvvZktbFyGBC1Q3z6OOK9yu', NULL, '1', '', NULL, '1');
INSERT INTO `ev_users` VALUES (23, 'a', '$2a$10$Pmgj6MjClJxcLWiVXkkKueUKdewiXhM0X02U73A2uXD2OCDvMn1U2', NULL, NULL, '', NULL, NULL);
INSERT INTO `ev_users` VALUES (24, 'root2', '$2a$10$p.Gx59WsUSYmoerSdDZ2KuWOFlgdPe0RalyQzgiBHc1Ujzj8eSVSO', NULL, NULL, '', NULL, NULL);
INSERT INTO `ev_users` VALUES (25, 'root3', '$2a$10$rIayxD5ALwC6MdsOD5sje.g4jLuMr9oUgYDB4CB4DjTIoA.qu7jTi', NULL, NULL, '', NULL, NULL);
INSERT INTO `ev_users` VALUES (26, 'root4', '$2a$10$KTQgGEYRrSldCD9lO4uI5OdUDyKpaA.UHrbzgrGbTGNHD7U0KKVk.', NULL, NULL, '', NULL, NULL);
INSERT INTO `ev_users` VALUES (27, 'root5', '$2a$10$a0A61W1QWmnQAb/bVNHz9.JaQNMt4uzinOJwpe/iaQNOzOt9bo8ZO', NULL, '1', '', NULL, '1');

-- ----------------------------
-- Table structure for ev_years
-- ----------------------------
DROP TABLE IF EXISTS `ev_years`;
CREATE TABLE `ev_years`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '年月份',
  `alias` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` int(10) NULL DEFAULT NULL COMMENT '用户索引',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 80 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ev_years
-- ----------------------------
INSERT INTO `ev_years` VALUES (79, '2022年-11月', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
