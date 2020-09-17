import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn({ type: "smallint", name: "user_id" })
  id: number;

  @Column("varchar", { name: "account_name", length: 24 })
  accountName: string;

  @Column("varchar", { name: "real_name", length: 20 })
  realName: string;

  @Column("char", { name: "passwd", length: 32 })
  passwd: string;

  @Column("char", { name: "passwd_salt", length: 6 })
  passwdSalt: string;

  @Column("varchar", { name: "moblie", length: 15 })
  moblie: string;

  @Column("tinyint", { name: "role", default: () => "'0'" })
  role: number;

  @Column("tinyint", { name: "user_status"})
  userStatus: number;

  @Column("smallint", { name: "create_by" })
  createBy: number;

  @Column("timestamp", { name: "create_time"})
  createTime: Date;

  @Column("smallint", { name: "update_by" })
  updateBy: number;;

  @Column("timestamp", { name: "update_time" })
  updateTime: Date;

}