class Docket < ActiveRecord::Base
  has_and_belongs_to_many :products

  has_and_belongs_to_many :reference_sets
  has_and_belongs_to_many :case_studies
  has_many :questions, :dependent => :destroy
  has_many :dockets_documents,:dependent => :destroy
  has_many :documents,:through => :dockets_documents
  has_one :super_set


end
