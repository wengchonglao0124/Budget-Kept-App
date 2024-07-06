DROP SCHEMA IF EXISTS budgetKeeper;
CREATE SCHEMA budgetKeeper;
USE budgetKeeper;
SET AUTOCOMMIT=0;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL UNIQUE,
    hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

--
-- Table structure for table `ResetPins`
--

DROP TABLE IF EXISTS `ResetPins`;
CREATE TABLE `ResetPins` (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    pin_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

--
-- Table structure for table `UserFinancials`
--

DROP TABLE IF EXISTS `UserFinancials`;
CREATE TABLE `UserFinancials` (
    user_id INT NOT NULL,
    current_balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
CREATE TABLE `Transactions` (
    id VARCHAR(36) NOT NULL,
    user_id INT NOT NULL,
    type ENUM('expense', 'income') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    date DATE NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

COMMIT;

SET AUTOCOMMIT = 1;