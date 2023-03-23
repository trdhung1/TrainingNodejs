/* eslint-disable prettier/prettier */
import { Member } from '../../members/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  IsNull,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  status: string;

  @Column({ type: 'date' })
  openDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @ManyToMany(() => Member, (member) => member.projects, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  public members: Member[];

  @ManyToOne(() => Member)
  @JoinColumn()
  projectManager: Member;
}
