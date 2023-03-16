/* eslint-disable prettier/prettier */
import { Member } from 'src/members/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  IsNull,
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

  @OneToMany(() => Member, (member) => member.project, {
    cascade: ['insert', 'update'],
  })
  public members: Member[];

  @OneToOne(() => Member)
  @JoinColumn()
  projectManager: Member;
}
