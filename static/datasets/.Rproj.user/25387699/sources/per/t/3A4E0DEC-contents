a_df <- male_normal[male_normal$vowel == "a", ]
colnames(a_df)[2:4] <- c("a_y", "a_z", "a_x")

i_df <- male_normal[male_normal$vowel == "i", ]
colnames(i_df)[2:4] <- c("i_y", "i_z", "i_x")
u_df <- male_normal[male_normal$vowel == "u", ]
colnames(u_df)[2:4] <- c("u_y", "u_z", "u_x")

# male_normal_plotly <- merge(a_df, i_df, u_df, by=a_df$vowel)

write.table(a_df, file = "a_male_normal.csv", sep = ',', row.names = FALSE)
write.table(i_df, file = "i_male_normal.csv", sep = ',', row.names = FALSE)
write.table(u_df, file = "u_male_normal.csv", sep = ',', row.names = FALSE)


# all
a_all <- all[all$vowel == "a", ]
a_all <- a_all[ , c("log_f1_sr", "log_f2_f1", "log_f3_f2")]
colnames(a_all)[1:3] <- c("a_y", "a_z", "a_x")

i_all <- all[all$vowel == "i", ]
i_all <- i_all[ , c("log_f1_sr", "log_f2_f1", "log_f3_f2")]
colnames(i_all)[1:3] <- c("i_y", "i_z", "i_x")

u_all <- all[all$vowel == "u", ]
u_all <- u_all[ , c("log_f1_sr", "log_f2_f1", "log_f3_f2")]
colnames(u_all)[1:3] <- c("u_y", "u_z", "u_x")

write.table(a_all, file = "a_all.csv", sep = ',', row.names = FALSE)
write.table(i_all, file = "i_all.csv", sep = ',', row.names = FALSE)
write.table(u_all, file = "u_all.csv", sep = ',', row.names = FALSE)
