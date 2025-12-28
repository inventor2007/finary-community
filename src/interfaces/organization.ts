import { SelectedMembership } from './user';

export interface Organization {
    id: string;
    name: string;
    organization_type: string;
    members: OrganizationMember[];
    memberships: OrganizationMember[];
}

export type OrganizationMember = SelectedMembership;
