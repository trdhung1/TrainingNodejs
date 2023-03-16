/* eslint-disable prettier/prettier */
import { Project } from 'src/projects/entites/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: string;

  @Column()
  role: string;

  @Column()
  position: string;

  @ManyToOne(() => Member)
  @JoinColumn()
  onboardingMentor: Member;

  @ManyToOne(() => Project, (project) => project.members)
  project: Project;
}
